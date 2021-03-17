import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {css} from "@emotion/css";
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../../../../Static/Images/Login/Logo.png';
import '../../../../../Static/Styles/Public/Login/Form.css';
import {APP} from "../../../../../App/Init/AppProvider";
import {connect} from 'react-redux';
import {SET_AUTH} from "../../../../../Global/Data/Actions/Global/Auth/Auth.Action";

const __css_shape1 = css(`
    height: 90px;
    width: 60%;
    border-bottom-right-radius: 100px;
    background-color: rgb(235, 238, 255);
    opacity: 0.502;
    position: absolute;
    z-index: 998;
    top: 0;
    left: 0;
    
    @media only screen and (max-width: 984px) {
        height: 60px;
        width: 40%;
    }
`);

const __css_shape2 = css(`
    height: 100px;
    width: 13%;
    border-top-left-radius: 100px;
    background-color: rgb(235, 238, 255);
    opacity: 0.502;
    position: absolute;
    z-index: 998;
    bottom: 0;
    right: 0;
    
    @media only screen and (max-width: 984px) {
        height: 60px;
        width: 25%;
    }
`);

const __css_formContainer = css(`
    position: absolute;
    z-index: 999;
    top: 110px;
    left: 30px;
    right: 30px;
    bottom: 110px;
    overflow: auto;
    padding: 100px 100px 100px 100px;
    
    @media only screen and (max-width: 984px) {
        top: 0;
        left: 5px;
        right: 5px;
        bottom: 0;
        padding: 70px 10px 70px 10px;
    }
`);



const __css_MobileHeaderContainer = css(`
    display: none;
    text-align: center;
    
    @media only screen and (max-width: 984px) {
        display: block;
    }
`);

const __css_mobileHeaderLogoImage = css(`
    display: inline-block;
    width: 70px;
`);

const __css_mobileHeaderTitleBadge = css(`
    display: inline-block;
    background-color: rgb(93, 78, 221);
    box-shadow: 0px 10px 14.72px 1.28px rgba(93, 78, 221, 0.3);
    border-radius: 50px;
    padding: 3px 12px;
    font-size: 13px;
    color: #ffffff;
    margin-top: 15px;
`);

const __css_mobileHeaderTitle = css(`
    display: inline-block;
    color: rgb(36, 49, 140);
    font-family: poppinsSemiBold;
    font-size: 14px;
    margin-top: 15px;
`);

const __css_mobileHeaderHzLine = css(`
    background-color: rgb(93, 78, 221);
    opacity: 0.302;
    height: 1px;
    margin: 10px 0 30px 0;
`);


const __css_title = css(`
    margin: 0;
    padding: 0;
    font-size: 28px;
    font-family: poppinsSemiBold;
    
    @media only screen and (max-width: 984px) {
        text-align: center;
    }
`);

const __css_titleHint = css(`
    margin: 0;
    margin-top: 10px;
    padding: 0;
    font-size: 15px;
    color: #afafaf;
    font-family: poppinsLight;
    
    @media only screen and (max-width: 984px) {
        text-align: center;
    }
`);

const __css_InputLabel = css(`
    font-family: poppinsSemiBold;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 10px;
`);

const __css_InputField = css(`
    border: 1px solid rgb(239, 238, 240);
    border-radius: 2px;
    font-family: poppinsLight;
    padding: 7px 30px;
    font-size: 15px;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
    transition: all 0.2s;
    
    &:focus {
        border: 1px solid rgb(93, 78, 221);
        box-shadow: 0px 3px 6.44px 0.56px rgba(93, 78, 221, 0.08);
    }
`);

const __css_InputFieldError = css(`
    border: 1px solid red;
    &:focus {
        border: 1px solid red;
        box-shadow: 0px 3px 6.44px 0.56px #f2c4c4;
    }
`);

const __css_InputFieldErrorLabel = css(`
    color: red;
    font-size: 13px;
    margin-top: 2px;
`);

const __css_SubmitButton = css(`
    border-radius: 2px;
    background-color: rgb(93, 78, 221);
    color: #ffffff;
    box-shadow: 0px 3px 14.72px 1.28px rgba(93, 78, 221, 0.2);
    font-family: poppinsLight;
    padding: 7px 30px;
    font-size: 15px;
    border: 1px rgb(93, 78, 221);
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
    
    &:hover {
        opacity: 0.9;
    }
`);

const __css_SubmitButtonProgress = css(`
    background: #cecece;
    color: #3a3a3a;
    border: 1px solid #cecece;
    box-shadow: none !important;
    pointer-events: none;
`);

const __css_ForgotPasswordLink = css(`
    color: rgb(93, 78, 221) !important;
    text-decoration: none !important;
    font-family: poppinsLight;
    font-size: 14px;
    
    &:hover {
        opacity: 0.5;
    }
`);


const __css_Loader = css(`
    vertical-align: middle !important;
    color: #3a3a3a !important;
    margin-left: 10px !important;
`);

class Form extends React.Component<any, any> {
    public state: any;

    public constructor(props: any) {
        super(props);

        this.state = {
            Loading: false,
            Email: '',
            Password: '',

            EmailError: false,
            EmailErrorMessage: '',
            PasswordError: false,
            PasswordErrorMessage: '',
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSetEmailFieldError = this.handleSetEmailFieldError.bind(this);
        this.handleSetPasswordFieldError = this.handleSetPasswordFieldError.bind(this);
    }

    protected handleSetEmailFieldError(status: boolean, message: string | null): void {
        this.setState({
            EmailError: status,
            EmailErrorMessage: message,
        });
    }

    protected handleSetPasswordFieldError(status: boolean, message: string | null): void {
        this.setState({
            PasswordError: status,
            PasswordErrorMessage: message,        });
    }

    protected handleFormSubmit(e: any) : void {
        e.preventDefault();

        /**
         * Validate the form
         */
        if(!APP.FUNCTIONS.VALIDATE_EMAIL_ADDRESS(this.state.Email)) {
            this.handleSetEmailFieldError(true, 'Please enter a valid email');
            return;
        } else {
            this.handleSetEmailFieldError(false, null);
        }

        if(this.state.Password === '') {
            this.handleSetPasswordFieldError(true, 'Please enter a password');
            return;
        } else {
            this.handleSetPasswordFieldError(false, null);
        }




        /**
         * Try to login now
         */
        const Auth = new APP.SERVICES.AUTH();

        this.setState({Loading: true});

        axios.post(APP.CONFIG.API_ROOT + '/auth/attempt', {
            email: this.state.Email,
            password: this.state.Password,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {
            this.setState({Loading: false});


            if(data.success) {
                Auth.set(data.token);
                this.props.func.HandleSetAuth(true);
                this.props.history.push(APP.ROUTES.PRIVATE.DASHBOARD);
            } else if(data.error_code === 'CREDENTIALS_ERROR') {
                this.handleSetEmailFieldError(true, 'Your email was incorrect!');
                this.handleSetPasswordFieldError(true, 'Your password was incorrect!');
            } else {
                alert(data.message);
            }
        }).catch((error) => {
            this.setState({Loading: false});
            alert('Failed to login! ' + error);
        });
    }

    public render(): any {
        return (
            <React.Fragment>
                <div className={__css_shape1}/>
                <div className={__css_shape2}/>
                <div className={__css_formContainer}>

                    <div className={__css_MobileHeaderContainer}>
                        <div>
                            <img src={Logo} alt={"Logo"} className={__css_mobileHeaderLogoImage}/>
                        </div>
                        <div>
                            <div>
                                <div className={__css_mobileHeaderTitleBadge}>
                                    প্রত্যয়ী স্যাপার্স
                                </div>
                            </div>
                            <div>
                                <div className={__css_mobileHeaderTitle}>
                                    20 Engineer Construction Battalion Bangladesh Army
                                </div>
                            </div>
                            <div className={__css_mobileHeaderHzLine}/>
                        </div>
                    </div>

                    <h2 className={__css_title}>Log In</h2>
                    <div className={__css_titleHint}>
                        Enter your email and password to login to our dashboard
                    </div>

                    <div style={{marginTop: 60}}>
                        <form onSubmit={this.handleFormSubmit}>
                            {/* Email address */}
                            <div className={__css_InputLabel}>Email</div>
                            <div>
                                <input type={"email"} placeholder={"Enter your email"} className={__css_InputField + (this.state.EmailError ? ' ' + __css_InputFieldError : '')} value={this.state.Email} onChange={(e) => this.setState({Email: e.target.value})}/>
                            </div>
                            {this.state.EmailError && (
                                <div className={__css_InputFieldErrorLabel}>{this.state.EmailErrorMessage}</div>
                            )}



                            {/* Password */}
                            <div className={__css_InputLabel}>Password</div>
                            <div>
                                <input type={"password"} placeholder={"Enter your password"}
                                       className={__css_InputField + (this.state.PasswordError ? ' ' + __css_InputFieldError : '')} value={this.state.Password} onChange={(e) => this.setState({Password: e.target.value})}/>
                            </div>
                            {this.state.PasswordError && (
                                <div className={__css_InputFieldErrorLabel}>{this.state.PasswordErrorMessage}</div>
                            )}




                            {/* Login Button */}
                            <div>
                                <button type={"submit"} className={__css_SubmitButton + (this.state.Loading ? ' ' + __css_SubmitButtonProgress : '')}>
                                    {this.state.Loading ? (
                                        <Fragment>
                                            Signing In <CircularProgress size={15} className={__css_Loader}/>
                                        </Fragment>
                                    ) : 'Sign In'}
                                </button>
                            </div>

                            <div>
                                <a href={""} className={__css_ForgotPasswordLink}>Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        func: {
            HandleSetAuth: (isLoggedIn: boolean): void => {
                dispatch(SET_AUTH(isLoggedIn));
            }
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Form));