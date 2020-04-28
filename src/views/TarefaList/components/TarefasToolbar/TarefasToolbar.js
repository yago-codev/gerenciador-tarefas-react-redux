import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Button, 
  TextField, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TarefasToolbar = props => {
  const { className, salvar, ...rest} = props;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const classes = useStyles();

  const submeterDados = (event) => {
    event.preventDefault();

    const tarefa = {
      categoria,
      descricao,
    }

    salvar(tarefa);

    setDescricao('');
    setCategoria('');
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <Grid
          container
        >
          <Grid
            item
            md={4}
            sm={4}
          >
            <TextField
              autoFocus
              className={classes.searchInput}
              fullWidth
              label="Descrição"
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição da tarefa"
              value={descricao}
            />
          </Grid>

          <Grid
            item
            md={4}
            sm={4}
            style={{ marginLeft: '32px' }}
          >
            <FormControl
              fullWidth
            >
              <InputLabel>Categoria:</InputLabel>
              <Select
                onChange={e => setCategoria(e.target.value)}
                value={categoria}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="TRABALHO">Trabalho</MenuItem>
                <MenuItem value="ESTUDOS">Estudo</MenuItem>
                <MenuItem value="OUTROS">Outros</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={2}
            style={{ marginLeft: '32px' }}

          >
            <Button
              color="secondary"
              onClick={submeterDados}
              variant="contained"
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TarefasToolbar.propTypes = {
  className: PropTypes.string,
  salvar: PropTypes.func,
};

export default TarefasToolbar;
