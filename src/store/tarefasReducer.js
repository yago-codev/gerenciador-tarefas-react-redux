import api from '../services/api';

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADICIONAR: 'TAREFAS_ADICIONAR',
  REMOVER: 'TAREFAS_REMOVER',
}

const ESTADO_INICIAL = {
  tarefas: [],
}

export const tarefasReducer = (state = ESTADO_INICIAL, action) => {
  switch(action.type) {
    case ACTIONS.LISTAR:
      return { ...state, tarefas: action.tarefas }
    
    default:
      return { state }
  }
}

export function listar() {
  return dispatch => {  // dispatch do 'redux-thunk'
    const email = localStorage.getItem('@GerenciadorTarefas:email_usuario_logado');
    const headers = { 'x-tenant-id' : email }
  
    api.get('/tarefas', { headers })
      .then(response => {
        dispatch({
          type: ACTIONS.LISTAR,
          tarefas: response.data,
        });
      })
  }
}
