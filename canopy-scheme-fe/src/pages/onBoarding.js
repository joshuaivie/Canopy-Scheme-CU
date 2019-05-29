import React from "react";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
import * as Routes from "../routes";
import browserSvg from "../assets/svg/browser.svg";
import checklistSvg from "../assets/svg/checklist.svg";
import handGestureSvg from "../assets/svg/hand-gesture.svg";

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
            speed: 200,
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
                    <h2 className="primary-text">Canopy Scheme 2019</h2>
                    <Slider ref={c => (this.slider = c)} {...settings}>
                        <div className="item" key={1}>
                            <img
                                src={handGestureSvg}
                                className="float"
                                alt="onboarding"
                                width="250"
                            />
                            <h3>Convenient</h3>
                            <p>
                                Place your convocation table reservations with
                                your device from anywhere at anytime.{" "}
                            </p>
                        </div>
                        <div className="item" key={2}>
                            <img
                                src={browserSvg}
                                className="float"
                                alt="onboarding"
                                width="250"
                            />
                            <h3>Flexible</h3>
                            <p>
                                The platform provides you with all your needs
                                for making a reservation from making an order to
                                cotacting us from support.{" "}
                            </p>
                        </div>
                        <div className="item" key={3}>
                            <img
                                src={checklistSvg}
                                className="float"
                                alt="onboarding"
                                width="250"
                            />
                            <h3>Orderly</h3>
                            <p>
                                Easily find information you need and perform
                                various actions to make your reservation
                                seemless.{" "}
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
