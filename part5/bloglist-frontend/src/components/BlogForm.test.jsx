import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let container;
  const mockHandler = vi.fn();

  beforeEach(() => {
    container = render(<BlogForm addNewBlog={mockHandler} />).container;
  });

  test("Add new blog event handler is called properly", async () => {
    const user = userEvent.setup();

    const titleInput = container.querySelector(".input-blog-title");
    await user.type(titleInput, "test-title");

    const authorInput = container.querySelector(".input-blog-author");
    await user.type(authorInput, "test-author");

    const urlInput = container.querySelector(".input-blog-url");
    await user.type(urlInput, "test-url");

    const createBlogBtn = container.querySelector(".btn-create-blog");
    await user.click(createBlogBtn);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
      title: "test-title",
      author: "test-author",
      url: "test-url",
    });
  });
});
