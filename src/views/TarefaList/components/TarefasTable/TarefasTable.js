import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll'
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = props => {
  const { className, tarefas, alterarStatus, deletarTarefa, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell><></></TableCell>
                  <TableCell><></></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map(tarefa => (
                  <TableRow key={tarefa.id}>
                    <TableCell>{tarefa.id}</TableCell>
                    <TableCell>{tarefa.descricao}</TableCell>
                    <TableCell>{tarefa.categoria}</TableCell>
                    <TableCell>{tarefa.done ? 'Concluído' : 'Pendente'}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => alterarStatus(tarefa.id)}
                      >
                        {tarefa.done ? (
                          <DoneAllIcon style={{ color: 'green' }} />
                        ) : (
                          <TimerIcon  />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deletarTarefa(tarefa.id)}
                      >
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  deletarTarefa: PropTypes.func,
  tarefas: PropTypes.array.isRequired
};

export default TarefasTable;
