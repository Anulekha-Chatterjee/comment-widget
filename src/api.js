export const getComments = async () => {
  return [
    {
      id: "1",
      text: "First comment",
      parentId: null,
      user: "User1",
      createdAt: "12/2/2023"
    },
    {
      id: "2",
      text: "Second comment",
      parentId: null,
      user: "User2",
      createdAt: "12/3/2023"
    }
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    text,
    parentId,
    createdAt: new Date().toLocaleTimeString(),
    user: "User"
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
