import React from "react";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
import * as Routes from "../routes";
import studentSvg from "../assets/svg/student.svg";

class OnBoarding extends React.Component {
    next = () => {
        this.slider.slickNext();
    };
    previous = () => {
        this.slider.slickPrev();
    };

    checkIndex = (oldIndex, newIndex) => {
        if (oldIndex === 2) {
            this.completeOnBoarding();
        }
    };

    completeOnBoarding = () => {
        const {
            history: { push }
        } = this.props;
        localStorage.setItem("oldUser", true);
        push(Routes.HOME);
    };

    render() {
        const settings = {
            dots: true,
            draggable: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (oldIndex, newIndex) =>
                this.checkIndex(oldIndex, newIndex)
        };

        return (
            <div id="on-boarding">
                <div className="skip-text">
                    <Button variant="link" onClick={this.completeOnBoarding}>
                        Skip
                    </Button>
                </div>
                <div className="content">
                    <Slider ref={c => (this.slider = c)} {...settings}>
                        <div className="item" key={1}>
                            <img
                                src={studentSvg}
                                alt="onborading"
                                width="150"
                            />
                            <h3>Hello world</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.{" "}
                            </p>
                        </div>
                        <div className="item" key={2}>
                            <img
                                src={studentSvg}
                                alt="onborading"
                                width="150"
                            />
                            <h3>Hello</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.{" "}
                            </p>
                        </div>
                        <div className="item" key={3}>
                            <img
                                src={studentSvg}
                                alt="onborading"
                                width="150"
                            />
                            <h3>World</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.{" "}
                            </p>
                        </div>
                    </Slider>
                    <Button className="float-right" onClick={this.next}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default OnBoarding;
