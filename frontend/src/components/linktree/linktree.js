import React from 'react';
import Button from '../Button/Button';
import profilepic from './Usericon2.jpg'

// css
import './linktree.scss';

function linktree() {
    return (
        <div>
            <div className="LinkTree">
                <section>
                    <img width="150px" height="150px" src={profilepic} alt="user icon" className="profile-picture" />
                    <div className="profile-name">
                        <p className="profile-name-text">@mjwcodr</p>
                    </div>
                </section>
                <section>
                    <div className="socials">
                        <a className="social-logo-outer" href="https://github.com/mjwcodr">
                            <svg className="social-logo" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                        </a>
                        <a className="social-logo-outer" href="https://twitter.com/LinkOutOfHyrule">
                            <svg className="social-logo" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                        </a>
                        <a className="social-logo-outer" href="https://www.instagram.com/mjwcodr/">
                            <svg className="social-logo" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3" /><line x1="16.5" y1="7.5" x2="16.5" y2="7.501" /></svg>
                        </a>
                    </div>
                    <div className="ButtonContainer">
                        <Button href="https://mjwcodr.de"> Website </Button>
                        <Button href="/shorturls">URL-Shortener</Button>
                    </div>
                </section>

            </div>
            {/* <div className="end-tag">With ❤️ From Berlin</div> */}

        </div>
    );
}

export default linktree;