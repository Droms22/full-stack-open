import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outline" className="mt-4" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline" className="mt-4" onClick={toggleVisibility}>
          Close
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
