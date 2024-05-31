import "../../../styles/feed/create/createFeedFindUser.scss";
import Input from "../../basic/Input";
import UserCard from "../../UserCard";
const CreateFeedFindUser = ({ hashSearch }) => {
  return (
    <div className="CreateFeedFindUser width-350">
      <Input width={300} value={hashSearch}></Input>
      <div className="CreateFeedFindUser-result">
        <div>
          <UserCard
            img={"/image/dp.jpg"}
            userName={"hihihi"}
            width={"width-30"}
          ></UserCard>
        </div>
        <div>
          <UserCard
            img={"/image/dp.jpg"}
            userName={"hihihi"}
            width={"width-30"}
          ></UserCard>
        </div>
        <div>
          <UserCard
            img={"/image/dp.jpg"}
            userName={"hihihi"}
            width={"width-30"}
          ></UserCard>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedFindUser;
