var React = require('react');


var Home = React.createClass({
  render() {
    return (
      <div className="home">
        <div className="header-image">
          <div className="title">
            <div className="brand">eLIBRARY</div>
            <div className="slogan">Handy ability to choose a book from your sofa</div>
          </div>
        </div>

        <div className="readers">
          <h2>We are reading by:</h2>
          <div className="col-md-4 reader">
            <div className="img-wrapper" style={{backgroundImage: "url(\"/images/chuck.jpeg\")"}} />
            <h3>Chuck Norris</h3>
          </div>
          <div className="col-md-4 reader">
            <div className="img-wrapper" style={{backgroundImage: "url(\"/images/family_guy.jpeg\")"}} />
            <h3>Peter Griffin</h3>
          </div>
          <div className="col-md-4 reader">
            <div className="img-wrapper" style={{backgroundImage: "url(\"/images/some_guy.jpeg\")"}} />
            <h3>This guy</h3>
          </div>
        </div>

        <div className="info">
          {largeText}
        </div>

      </div>
    );
  }
});

var largeText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book. It has survived not only five centuries, but also the leap into
electronic typesetting, remaining essentially unchanged. It was popularised in
the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including
versions of Lorem Ipsum.`;

module.exports = Home;