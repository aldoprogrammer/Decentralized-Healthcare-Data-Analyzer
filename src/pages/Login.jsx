import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Logo from '../assets/dhda.png'
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-auto">
      <img src={Logo} alt="" className="w-52 h-52" />
      <Card color="white" shadow={true} className="w-2/5 mx-auto p-5 flex items-center justify-center h-4/5 mb-10">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6 items-start">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Link to='/dashboard'>
            <Button className="mt-6" fullWidth>
              Sign In
            </Button>
            {/* Create button for Metamask login */}
            <Button className="mt-3 bg-yellow-900 hover:bg-gradient-to-r text-white font-bold duration-300 ease-out px-4 rounded
                w-full py-3">
              Connect with Metamask
            </Button>
          </Link>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}