enum ErrorMsg {
  LIST_POSTS_ERROR = 'Erro ao listar os posts',
  GET_USER_DATA_ERROR = 'Erro ao buscar os dados do usuário',
  REMOVE_POST_ERROR = 'Erro ao excluir o post',
  LIST_COMMENTS_ERROR = 'Erro ao listar os comentários',
  LIST_USERS_ERROR = 'Não foi possível carregar os usuários'
}

enum SuccessMsg {
  REMOVE_POST_SUCCESS = 'Post excluído com sucesso!'
}

export { ErrorMsg, SuccessMsg }