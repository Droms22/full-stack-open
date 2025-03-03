import React, { useState } from 'react';
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

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doCreate({ title, url, author });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl">Create new blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title" className="text-lg">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter the title"
                type="text"
                data-testid="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="author" className="text-lg">
                Author
              </Label>
              <Input
                id="author"
                placeholder="Enter the author"
                type="text"
                data-testid="author"
                value={author}
                onChange={handleAuthorChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url" className="text-lg">
                Url
              </Label>
              <Input
                id="url"
                placeholder="Enter the url"
                type="text"
                data-testid="url"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="outline">
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewBlog;

/*
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>

        <button type="submit">Create</button>
      </form>
    </div>
*/
