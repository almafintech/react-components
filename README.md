## Usage

Before using the components from this library, make sure to wrap your application with `NextUIProvider` from `@nextui-org/react`. This is necessary to provide the necessary context for the components.

Here's an example:

```jsx
import { NextUIProvider } from "@nextui-org/react";
import { YourComponent } from "your-library";

function App() {
  return (
    <NextUIProvider>
      <YourComponent />
    </NextUIProvider>
  );
}

export default App;
```
