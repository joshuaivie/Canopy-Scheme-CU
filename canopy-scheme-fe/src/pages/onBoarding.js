import React from "react";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
import * as ROUTES from "routes";
import browserSvg from "assets/svg/browser.svg";
import checklistSvg from "assets/svg/checklist.svg";
import handGestureSvg from "assets/svg/hand-gesture.svg";

class OnBoarding extends React.Component {
  state = {
    atStart: true
  };

  next = () => {
    this.slider.slickNext();
  };
  previous = () => {
    this.slider.slickPrev();
  };

  checkIndex = (oldIndex, newIndex) => {
    if (oldIndex === 2 && newIndex === 2) {
      this.completeOnBoarding();
    }
    if (oldIndex === 1 && newIndex === 0) {
      this.setState({ atStart: true });
    } else {
      this.setState({ atStart: false });
    }
  };

  completeOnBoarding = () => {
    const {
      history: { push }
    } = this.props;
    localStorage.setItem("oldUser", true);
    push(ROUTES.HOME);
  };

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (oldIndex, newIndex) => this.checkIndex(oldIndex, newIndex)
    };

    const { atStart } = this.state;

    return (
      <div id="on-boarding">
        <div className="skip-text">
          <Button variant="link" onClick={this.completeOnBoarding}>
            Skip
          </Button>
        </div>
        <div className="content">
          <h2 className="primary-text">Canopy Scheme 2019</h2>
          <Slider ref={c => (this.slider = c)} {...settings}>
            <div className="item" key={1}>
              <img
                src={handGestureSvg}
                className="float"
                alt="onboarding"
                width="150"
              />
              <h3>Convenient</h3>
              <p>
                Place your convocation table reservations with your device from anywhere
                at anytime.{" "}
              </p>
            </div>
            <div className="item" key={2}>
              <img src={browserSvg} className="float" alt="onboarding" width="150" />
              <h3>Flexible</h3>
              <p>
                The platform provides you with all your needs for making a reservation
                from making an order to contacting us from support.{" "}
              </p>
            </div>
            <div className="item" key={3}>
              <img src={checklistSvg} className="float" alt="onboarding" width="150" />
              <h3>Orderly</h3>
              <p>
                Easily find information you need and perform various actions to make
                your reservation seemless.{" "}
              </p>
            </div>
          </Slider>
          <div>
            <Button
              className="float-left"
              variant="link"
              disabled={atStart}
              onClick={this.previous}
            >
              Prev
            </Button>
            <Button className="float-right" onClick={this.next}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default OnBoarding;
