Destructuring Example
Before

---

export const TaskList: React.FC`<TaskListProps>` = (props) => {
  const tasks = props.tasks;
  const onStatusChange = props.onStatusChange;
}

---

After
export const TaskList: React.FC `<TaskListProps>` = ({
  tasks,
  onStatusChange
})


* Interface = **blueprint**
* Props passed = **actual object**
* Destructuring = **taking values out of the object**

#### Use of <>, () in useState 

const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');
<> → TypeScript type argument to tell sort by only priority or status. this is compile-time (this is like additional value for the useState hook.
() -> Function call, runtime, javascript, this is the mandatory value

#### What is actually happnening in **const** [**searchQuery**, **setSearchQuery**] **=**useState(**''**); and similiar

`useState` returns an array `[state, setState]`, and we destructure it into two variables.

##### Basic Struct of a Component


```
import { useState, useEffect } from 'react';

// 1. Types / Props
interface Props {
  title: string;
}

// 2. Component
const MyComponent: React.FC<Props> = ({ title }) => {

  // 3. State
  const [value, setValue] = useState<string>("");

  // 4. Effects
  useEffect(() => {
    console.log("Value changed:", value);
  }, [value]);

  // 5. Handlers
  const handleClick = () => {
    setValue("Updated");
  };

  // 6. Render (JSX)
  return (
    <div>
      <h1>{title}</h1>
      <p>{value}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

// 7. Export
export default MyComponent;
```
