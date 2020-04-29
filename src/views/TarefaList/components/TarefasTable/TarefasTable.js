import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll'

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
  const { className, tarefas, alterarStatus, ...rest } = props;

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
                        color="primary"
                        onClick={() => alterarStatus(tarefa.id)}
                      >
                        {tarefa.done ? (
                          <DoneAllIcon />
                        ) : (
                          <TimerIcon />
                        )}
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
  tarefas: PropTypes.array.isRequired
};

export default TarefasTable;
