import React from "react";

interface JerseyProps {
  type: "solid" | "striped";
  primaryColor: string;
  secondaryColor?: string;
}

export default function Jersey({
  type,
  primaryColor,
  secondaryColor = "#ffffff",
}: JerseyProps) {
  const styleVars = {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        .jersey {
        position: relative;
        width: 150px;
        height: full;
        }

        .sleeve {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 20px;
        background-color: var(--primary-color);
        z-index: 1;
        }
        .sleeve.left {
        left: -40px;
        transform: rotate(-30deg);
        z-index: -10;
        border-radius: 10px 0 10px 10px;

        top: 41px;
        }
        .sleeve.right {
        right: -40px;
        transform: rotate(30deg);
        z-index: -10;
        top: 41px;
        border-radius: 0 10px 10px 10px;
        }

        .collar {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 20px;
        background-color: var(--secondary-color);
        border-radius: 10px 10px 0 0;
        z-index: 2;
        }

        .body {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        height: 200px;
        background-color: var(--primary-color);
        border-radius: 0 0 20px 20px;
        z-index: 0;
        }

        .jersey.striped .body {
        background-image: repeating-linear-gradient(
            90deg,
            var(--primary-color),
            var(--primary-color) 20px,
            var(--secondary-color) 20px,
            var(--secondary-color) 40px
        );
        }
        }
      `}</style>

      <div className="p-50">
        <div className={`jersey ${type}`} style={styleVars}>
          <div className="collar"></div>
          <div className="sleeve left"></div>
          <div className="sleeve right"></div>
          <div className="body"></div>
        </div>
      </div>
    </>
  );
}
