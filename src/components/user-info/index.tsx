import { FC } from "react";
import { Container } from "../container";
import { IProfile } from "../../api/dto/profiles";
import { FollowButton } from "../follow-edit-button";

export const UserInfo: FC<IProfile> = ({ username, bio, image }) => {
  return (
    <div className=" bg-zinc-100 pt-8 pb-4 mb-6">
      <Container className="[&.container]:px-24">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24  mb-4 text-sm text-center">
            <img
              className=" w-full h-full rounded-full object-cover"
              src={image}
              alt={`${username} avatar`}
            />
          </div>
          <h4 className="font-bold text-2xl mb-2 text-montana">{username}</h4>
          <p className="text-darkGray font-light mb-2">{bio}</p>
          <FollowButton username={username} />
        </div>
      </Container>
    </div>
  );
};
