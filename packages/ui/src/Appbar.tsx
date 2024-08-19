import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between items-center border-b px-4 py-6">
      <div className="text-4xl flex flex-col justify-center pl-4 font-bold">
        Wallet
      </div>
      <div className="flex flex-col justify-center items-center pt-2 h-full my-auto">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
