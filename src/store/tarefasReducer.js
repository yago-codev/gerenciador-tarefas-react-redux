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
