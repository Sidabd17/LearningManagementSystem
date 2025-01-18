import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerUser , {
       data : registerData,
       error : registerError,
       isLoading : registerIsLoading,
       isSuccess : registerIsSuccess
  }] = useRegisterUserMutation();

  const [loginUser , {
       data : loginData,
       error : loginError,
       isLoading : loginIsLoading,
       isSuccess : loginIsSuccess
  }] = useLoginUserMutation();

  const onChangehandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleSubmit = async (type) =>{
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  }
  return (
    <div className="m-20 p-5 flex justify-center align-center w-full">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  onChange={(e) => onChangehandler(e, "signup")}
                  value={signupInput.name}
                  required={true}
                  placeholder="Eg. Sajid"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={(e) => onChangehandler(e, "signup")}
                  value={signupInput.email}
                  type="email"
                  required={true}
                  placeholder="Eg. sajid@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="password"
                  name="password"
                  onChange={(e) => onChangehandler(e, "signup")}
                  value={signupInput.password}
                  type="password"
                  required={true}
                  placeholder="Eg. xyz123@"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleSubmit("signup")}>
              {
                  registerIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : "Signup"
                } 
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Login your password here . After signup , you will be logged
                in!.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={() => handleSubmit("login")}
                  value={loginInput.name}
                  type="email"
                  required={true}
                  placeholder="Eg. sajid@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">password</Label>
                <Input
                  id="password"
                  name="password"
                  onChange={(e) => onChangehandler(e, "login")}
                  value={loginInput.name}
                  type="password"
                  required={true}
                  placeholder="Eg. xyz123@"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleSubmit("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                    </>
                  ) : "Login"
                } 
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
