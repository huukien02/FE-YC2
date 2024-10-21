export const renderReaction = (type: string) => {
  if (type == "love") {
    return "❤️";
  }
  if (type == "like") {
    return "👍";
  }
  if (type == "angry") {
    return "😡";
  }
};
