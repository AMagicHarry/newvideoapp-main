const LinearBackground = ({ classes = '', style = {}, children = null } : { classes?: string, style?: object, children?: any }) => {
  return (
    <div className={`hero ${classes}`} style={style}>
      {/* <div
        className="shape"
        style={{
          '--color': '#B0FFB3',
          '--translateX-direction': 'alternate-reverse'
        } as React.CSSProperties}
      />
      <div
        className="shape"
        style={{
          '--color': '#E',
          '--translateX-direction': 'alternate-reverse'
        } as React.CSSProperties}
      />
      <div
        className="shape"
        style={{
          '--color': '#A1FFD2',
          '--direction': 'alternate-reverse'
        } as React.CSSProperties}
      />
      <div
        className="shape"
        style={{
          '--color': '#BAC2F1',
          '--translateY-direction': 'alternate-reverse'
        } as React.CSSProperties}
      /> */}
      {children}
    </div>
  );
};

export default LinearBackground;