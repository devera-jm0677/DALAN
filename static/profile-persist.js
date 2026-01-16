document.addEventListener('DOMContentLoaded', () => {
    const userEmail = document.body?.dataset?.userEmail?.toLowerCase() || '';
    const storageKey = userEmail ? `dalanUserProfile:${userEmail}` : 'dalanUserProfile';
    let stored = localStorage.getItem(storageKey);

    if (!stored && userEmail) {
        const fallback = localStorage.getItem('dalanUserProfile');
        if (fallback) {
            stored = fallback;
        } else {
            const nameEl = document.querySelector('.profile-name');
            const imgEl = document.querySelector('.profile-img');
            if (nameEl || imgEl) {
                const seedData = {
                    firstName: nameEl?.textContent?.trim() || '',
                    profileImageUrl: imgEl?.getAttribute('src') || '',
                    userEmail
                };
                localStorage.setItem(storageKey, JSON.stringify(seedData));
                stored = JSON.stringify(seedData);
            }
        }
    }

    document.querySelectorAll('[data-logout]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const proceed = () => {
                if (userEmail) {
                    localStorage.removeItem(storageKey);
                }
                localStorage.removeItem('dalanUserProfile');
                window.location.href = '/logout';
            };

            if (typeof Swal !== 'undefined' && Swal?.fire) {
                Swal.fire({
                    title: 'Log out?',
                    text: 'Are you sure you want to log out?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#2441AC',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, log out',
                    cancelButtonText: 'Cancel'
                }).then(result => {
                    if (result.isConfirmed) {
                        proceed();
                    }
                });
            } else if (confirm('Are you sure you want to log out?')) {
                proceed();
            }
        });
    });

    if (!stored) return;

    try {
        const data = JSON.parse(stored);
        if (!data) return;

        if (data.userEmail && userEmail && data.userEmail !== userEmail) {
            return;
        }

        if (data.firstName) {
            document.querySelectorAll('.profile-name').forEach(el => {
                el.textContent = data.firstName;
            });

            const welcomeTitle = document.querySelector('.welcome-title');
            if (welcomeTitle) {
                welcomeTitle.textContent = `Welcome back, ${data.firstName}!`;
            }

            const fullName = document.querySelector('.user-fullname');
            if (fullName) {
                const parts = fullName.textContent.trim().split(/\s+/);
                const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
                fullName.textContent = lastName ? `${data.firstName} ${lastName}` : data.firstName;
            }
        }

        if (data.profileImageUrl) {
            document.querySelectorAll('.profile-img, .user-profile-img').forEach(img => {
                img.src = data.profileImageUrl;
            });

            const preview = document.getElementById('profilePreview');
            if (preview) preview.src = data.profileImageUrl;
        }
    } catch (err) {
        console.error('Failed to apply persisted profile data:', err);
    }

    document.querySelectorAll('.profile-button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/user-profile';
        });
    });

    document.querySelectorAll('[data-page="bookmarks"]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = '/bookmark';
        });
    });

});
