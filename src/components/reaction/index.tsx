// components/ReactionButtons.tsx
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDataBlog, handleReaction } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetDataReactionBlogs } from "@/redux/reducers";

interface ReactionButtonsProps {
  blogId: number;
  userId: number;
  setAnchorEl: any;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  blogId,
  userId,
  setAnchorEl,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { dataReactionBlogs } = useSelector((state: any) => state);

  const handleAddReaction = async (type: string) => {
    if (type) {
      dispatch(handleReaction({ userId, blogId, type: type }));
    }
  };

  useEffect(() => {
    if (dataReactionBlogs) {
      toast(dataReactionBlogs.message, {
        type: "success",
      });
      dispatch(getDataBlog());
      dispatch(resetDataReactionBlogs());
      setAnchorEl(null);
    }
  }, [dataReactionBlogs]);

  return (
    <div className="border py-[5px] px-[5px] flex gap-[5px] rounded-[5px]">
      <button onClick={() => handleAddReaction("like")}>👍</button>
      <button onClick={() => handleAddReaction("love")}>❤️</button>
      <button onClick={() => handleAddReaction("angry")}>😡</button>
    </div>
  );
};

export default ReactionButtons;
