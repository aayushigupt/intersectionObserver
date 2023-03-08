import React from "react";

function useOnScreen(options) {
  const ref = React.useRef();
  const ref2 = React.useRef();
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry1, entry2]) => {
      // in parameter it consists of an array of dom elements and it is being destructured
      setVisible(entry1.isIntersecting); //as soon as the dom element intersects with screen it will change its state
      setVisible2(entry2.isIntersecting); 
    }, options); //options is considered as an argument

    if (ref.current) {
      observer.observe(ref.current); //started observing the dom element/ref.current element
    }

    if (ref2.current) {
      observer.observe(ref2.current); //started observing the dom element/ref.current element
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }

      if (ref2.current) {
        observer.unobserve(ref2.current);
      }
    }; //cleanup function
  }, [ref, ref2,  options]);

  return [visible, visible2, ref, ref2];
}

function App() {
  const [visible,visible2, ref, ref2] = useOnScreen({ threshold: 0.3 });
  return (
    <div className="App">
      <div className="top-landpage" style={{ height: "100vh" }}>
        Hello There, Scroll down to 300px
      </div>
      <div
        style={{
          height: "100vh",
          backgroundColor: visible ? "pink" : "orange",
        }}
        ref={ref}
      >
        {visible ? (
          <div className="visible-landpage">
            Hello there this is the first section which is visible 
          </div>
        ) : (
          <div> Hello there this is the first section which is not visible  </div>
        )}
      </div>
      <div
         style={{
          height: "100vh",
          backgroundColor: visible2 ? "red" : "yellow",
        }}
        ref={ref2}
         >
          {visible2 ? (
            <div className="visible-landpage">
              Hello there this is the second section which is visible 
            </div>
          ) : (
            <div> Hello there this is the second section which is not visible  </div>
          )}
        </div>
    </div>
  );
}

export default App;
