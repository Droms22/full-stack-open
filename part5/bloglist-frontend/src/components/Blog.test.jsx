import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const testUser = {
    username: "test-user",
    name: "test-user",
  };

  const testBlog = {
    title: "test-blog",
    author: "test-author",
    likes: 10,
    url: "test-url",
    user: testUser,
  };

  const mockHandler = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={testBlog} user={testUser} updateBlog={mockHandler} />
    ).container;
  });

  test("Component renders only blog title and author when collapsed", () => {
    const title = screen.getByText(`${testBlog.title} - ${testBlog.author}`);
    expect(title).toBeDefined();

    const urlDiv = container.querySelector(".blog-url");
    expect(urlDiv).toBeNull();

    const likesDiv = container.querySelector(".blog-likes");
    expect(likesDiv).toBeNull();

    const userDiv = container.querySelector(".blog-user");
    expect(userDiv).toBeNull();
  });

  test("Component renders all blog details when it is not collapsed", async () => {
    const user = userEvent.setup();
    const viewBlogBtn = container.querySelector(".btn-blog-view");
    await user.click(viewBlogBtn);

    const title = screen.getByText(`${testBlog.title} - ${testBlog.author}`);
    expect(title).toBeDefined();

    const urlDiv = container.querySelector(".blog-url");
    expect(urlDiv).toBeDefined();

    const likesDiv = container.querySelector(".blog-likes");
    expect(likesDiv).toBeDefined();

    const userDiv = container.querySelector(".blog-user");
    expect(userDiv).toBeDefined();
  });

  test("Like button event handler is called properly", async () => {
    const user = userEvent.setup();

    const viewBlogBtn = container.querySelector(".btn-blog-view");
    await user.click(viewBlogBtn);

    const likeBtn = container.querySelector(".btn-blog-like");
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
