import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { TarefasToolbar, TarefasTable } from './components';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [btnExcluirTarefa, setBtnExcluirTarefa] = useState(false);
  const [mensagemDialog, setMensagemDialog] = useState('');
  const [idTarefaExcluida, setIdTarefaExcluida] = useState(null);

  const email = localStorage.getItem('@GerenciadorTarefas:email_usuario_logado');
  const headers = { 'x-tenant-id' : email }

  useEffect(() => {
    listarTarefas();
  }, []);

  const salvar = (tarefa) => {
    api.post('/tarefas', tarefa, { headers })
      .then(response => {
        const novaTarefa = response.data;
        setTarefas([...tarefas, novaTarefa]);
        setMensagemDialog('Tarefa criada com sucesso.');
        setOpenDialog(true);
      }).catch(() => {
        setMensagemDialog('Ocorreu um erro ao tentar salvar a tarefa.');
        setOpenDialog(true);
      });
  }

  const listarTarefas = () => {
    api.get('/tarefas', { headers })
      .then(response => {
        const listaDeTarefas = response.data;
        console.log(response.data);
        setTarefas(listaDeTarefas);
      })
      .catch(() => {
        setMensagemDialog('Ocorreu um erro ao tentar carregar as tarefas.');
        setOpenDialog(true);
      });
  }

  const alterarStatus = (id) => {
    api.patch(`/tarefas/${id}`, null, { headers })
      .then(() => {
        const tarefaConcluida = [...tarefas];
        
        tarefaConcluida.map(tarefa => {
          if (tarefa.id === id) {
            tarefa.done = true;
          }
        })
        
        setTarefas(tarefaConcluida);
      })
      .catch(() => {
        setMensagemDialog('Ocorreu um erro ao alterar o status da terefa');
        setOpenDialog(true);
      });
  }

  const abrirModal = (id) => {
    setOpenDialog(true);
    setBtnExcluirTarefa(true);
    setIdTarefaExcluida(id);
  }

  const deletarTarefa = (id) => {
    api.delete(`/tarefas/${id}`, { headers })
      .then(() => {
        const lista = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(lista);
        setIdTarefaExcluida(null);
        setOpenDialog(false);
      }).catch(() => {
        setMensagemDialog('Ocorreu um erro ao tentar excluir a tarefa');
        setOpenDialog(true);
      });
  }

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable
          abrirModal={abrirModal}
          alterarStatus={alterarStatus}
          tarefas={tarefas}
        />
      </div>
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      >
        <DialogTitle>
          Atenção
        </DialogTitle>
        <DialogContent>
          {mensagemDialog}
        </DialogContent>
        <DialogActions>
          { btnExcluirTarefa && <Button
            idTarefaExcluida
            onClick={() => deletarTarefa(idTarefaExcluida)}
          >sim</Button> }
          <Button onClick={() => setOpenDialog(false)}>fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
