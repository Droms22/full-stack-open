import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useState } from 'react';

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <Card className="w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">BlogApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username" className="text-lg">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                type="text"
                data-testid="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                data-testid="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            value="Login"
            className="text-md"
            variant="outline"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
