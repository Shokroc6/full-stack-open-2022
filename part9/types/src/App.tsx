const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirement: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirement: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const courseName = "Half Stack application development";

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{courseName}</h1>;
  };

  interface CoursesProp {
    part: CoursePart;
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = (props: CoursesProp) => {
    switch (props.part.kind) {
      case "basic":
        return <em>{props.part.description}</em>;
      case "group":
        return <p>project exercises {props.part.groupProjectCount}</p>;
      case "background":
        return (
          <div>
            <p>{props.part.description}</p>
            <p>submit to {props.part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>{props.part.description}</p>
            <p>require skils: {props.part.requirement.join()}</p>
          </div>
        );
      default:
        return assertNever(props.part);
    }
  };

  interface CoursesProps {
    parts: CoursePart[];
  }

  const Content = (props: CoursesProps) => {
    return (
      <>
        {props.parts.map((course) => (
          <div>
            <p>
              <strong>
                {course.name} {course.exerciseCount}{" "}
              </strong>
            </p>
            <Part part={course} />
          </div>
        ))}
      </>
    );
  };

  const Total = (props: CoursesProps) => {
    return (
      <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
