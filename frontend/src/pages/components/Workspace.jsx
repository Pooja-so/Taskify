import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { membersRestored } from "../../state/memberSlice";
import axios from "../../axiosConfig";

import AddTaskCategory from "./AddTaskCategory";
import TaskCategoryList from "./TaskCategoryList";
import Button from "../atoms/Button";
import TaskList from "./TaskList";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledSection } from "../../styles/workspace.styles";

export default function Workspace(props) {
  const { workspaceId } = props;

  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const workspaceData = useSelector((state) =>
    state.workspaces.workspaces.find(
      (workspace) => workspace._id === workspaceId
    )
  );
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get(`/dashboard/taskCategories/${workspaceId}/`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => setTaskCategories(data))
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });

    axios
      .get(`/dashboard/members/${workspaceId}/`, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        console.log("members in workspace", data);
        dispatch(membersRestored(data));
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  }, []);

  const handleClick = (event) => {
    setOpen(!open);
  };

  const handleExpand = (event, categoryId) => {
    setExpand(!expand);
    if (event.target.tagName !== "BUTTON") setSelectedCategoryId(categoryId);
  };

  return (
    <StyledSection>
      {expand ? (
        <section>
          <Button onClick={handleExpand} type="button" text="Back" />
          <TaskList categoryId={selectedCategoryId} />
        </section>
      ) : (
        <>
          <section>
            <h1>{workspaceData?.name}</h1>
            <h1>Workspace details</h1>
            {workspaceData.leaders.includes(user._id) ? (
              <Button
                type="button"
                onClick={handleClick}
                text="Create Task Category"
              />
            ) : (
              <></>
            )}
            <Button
              type="button"
              onClick={() => navigate(`/chatbox/${workspaceData._id}`)}
              text="Chat box"
            />
            {open ? (
              <AddTaskCategory
                setOpen={setOpen}
                workspaceId={workspaceId}
                setTaskCategories={setTaskCategories}
              />
            ) : (
              <></>
            )}
          </section>
          {taskCategories.length ? (
            <section className="categories_container">
              <TaskCategoryList
                taskCategories={taskCategories}
                handleExpand={handleExpand}
              />
            </section>
          ) : (
            <>
              <h2>You dont have any taskCategory so please create one</h2>
            </>
          )}
        </>
      )}
      <ToastContainer />
    </StyledSection>
  );
}
