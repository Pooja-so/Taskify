import { useSelector, useDispatch } from "react-redux";
import axios from "../../axiosConfig";

import { membersRestored } from "../../state/memberSlice";

import MemberAccessCard from "./MemberAccessCard";

import { StyledSection } from "../../styles/memberAccessPanel.styles";

function MemberAccessPanel(props) {
  const { workspaceId, setOpenMemberAccessPanel } = props;
  const { leaders, members } = useSelector((state) => state.members);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.target.tagName === "SECTION") setOpenMemberAccessPanel(false);
  };

  const handleRemove = async (memberId) => {
    // console.log(member);
    await axios
      .patch(
        `/dashboard/workspace/${workspaceId}/member/remove`,
        { memberId },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        dispatch(membersRestored(data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledSection onClick={(event) => handleClick(event)}>
      <div className="panel">
        <h2>Members</h2>
        {members.map((member) => {
          return (
            <MemberAccessCard
              key={member._id}
              handleRemove={handleRemove}
              member={member}
              isLeader={leaders.includes(member._id)}
            />
          );
        })}
      </div>
    </StyledSection>
  );
}

export default MemberAccessPanel;
