"use strict";

/*
 *  Author:     Ethan Tan
 *  Admin:      p2012085
 *  Class:      DAAA/FT/1B/03
 *  File:       profile.js
 */

/**
 * Loads user's profile details
 */
function loadProfileContent() {
    const user = { ...GLOBAL_USER };
    const { username, email, profile_pic_url } = user;
    $('#chg-profile').html(ProfileCard(username, email, profile_pic_url || ''));
    watchProfileEdition();
    watchProfilePicUpload();
}

/**
 * Displays a preview of uploaded profile picture
 */
function watchProfilePicUpload() {
    $('#chg-pic').one('input', (event) => {
        const $this = event.target;
        const reader = new FileReader();
        reader.onload = e => {
            // @ts-ignore
            $('#profile-pic').attr('src', e.target.result);
        };
        reader.readAsDataURL($($this).prop('files')[0]);
    });
}

/**
 * Monitors when user updates their profile details
 */
function watchProfileEdition() {
    $('#chg-profile').one('submit', (event) => {
        event.preventDefault();
        const USER_ID = GLOBAL_USER.userid;

        // New Profile Pic
        const NEW_PROFILE_IMG = $('#chg-pic').prop('files')[0];
        const formData = new FormData();
        formData.append('userImage', NEW_PROFILE_IMG);

        // New Details
        const NEW_USERNAME = $('#chg-username').val();
        const NEW_EMAIL = $('#chg-email').val();
        const NEW_PASSWORD_RAW = $('#chg-password').val().toString();
        const UPDATED_DETAILS = {
            username: NEW_USERNAME,
            email: NEW_EMAIL
        };
        if (NEW_PASSWORD_RAW !== '') {
            if (validatePasswordStrength(NEW_PASSWORD_RAW)) {
                UPDATED_DETAILS.password = NEW_PASSWORD_RAW;
            }
            else {
                alert('Your password is not strong enough\n\nEnsure your password contains at least:\n* 1 lowercase letter,\n* 1 uppercase letter,\n* 1 number\n* 1 special character');
                return;
            }
        }
        if (NEW_PROFILE_IMG) {
            fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/user/${ USER_ID }/image`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
                },
                body: formData
            })
                .then(res => {
                    if (!res.ok) {
                        res.json().then(err => alert(`media types supported: ${err['media_types_supported']}\nmax file size: ${(err['max_file_size_bytes'] / 1000000).toFixed(2)} MB`));
                    }
                })
                .catch(ignore);
        }
        fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/users/${ USER_ID }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
            },
            body: JSON.stringify(UPDATED_DETAILS)
        })
            .then(res => {
                if (!res.ok) {
                    res.json().then(err => { throw err; });
                }
            })
            .then(() => alert('Successfully updated!'))
            .catch(err => alert('Error encountered'))
            .finally(() => {
                const userid = GLOBAL_USER.userid;
                fetch(`http://${ BACK_END_HOST }:${ BACK_END_PORT }/users/${ userid }`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
                    }
                })
                    .then(res => res.json())
                    .then(user => {
                        GLOBAL_USER = user;
                    })
                    .catch(ignore)
                    .finally(loadProfileContent);
            });
    });
}