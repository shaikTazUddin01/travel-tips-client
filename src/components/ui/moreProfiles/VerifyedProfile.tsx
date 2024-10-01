import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";


const VerifyedProfile = () => {
    return (
        <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3 mt-4">
        <h1 className="text-lg">Explore Verifyed profiles</h1>
  
  {/* profile */}
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button
              className={"border-default-200"}
              color="primary"
              radius="full"
              size="sm"
              variant="solid"
            >
              Follow
            </Button>
          </div>
        </div>
  
  {/* profile */}
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button
              className={"border-default-200"}
              color="primary"
              radius="full"
              size="sm"
              variant="solid"
            >
              Follow
            </Button>
          </div>
        </div>
  
  {/* profile */}
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button
              className={"border-default-200"}
              color="primary"
              radius="full"
              size="sm"
              variant="solid"
            >
              Follow
            </Button>
          </div>
        </div>
  
  {/* profile */}
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button
              className={"border-default-200"}
              color="primary"
              radius="full"
              size="sm"
              variant="solid"
            >
              Follow
            </Button>
          </div>
        </div>
      </div>
  
    );
};

export default VerifyedProfile;