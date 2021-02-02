/**
 * Loads user's profile details
 */
function loadProfileContent() {
    const user = { ...GLOBAL_USER };
    const { username, email, profile_pic_url } = user;
    $('#chg-profile').html(ProfileCard(username, email, profile_pic_url || ''));
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
    $('#chg-profile').on('submit', (event) => {
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
            fetch(`http://${BACK_END_HOST}:${BACK_END_PORT}/user/${ USER_ID }/image`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('sp-games-token')
                },
                body: formData
            })
                .then(res => {
                    if (!res.ok) {
                        res.json().then(err => { throw err; });
                    }
                })
                .catch(ignore);
        }
        fetch(`http://${BACK_END_HOST}:${BACK_END_PORT}/users/${ USER_ID }`, {
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
            .catch(err => alert(err.message))
            .finally(() => window.location.reload());
    });
}