document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu and icon active class
    const icon = document.querySelector('.icon');
    const menu = document.querySelector('.menu');

    icon.addEventListener('click', () => {
        menu.classList.toggle('active');
        icon.classList.toggle('active'); // Toggle active class for icon
    });

    // Close menu when any .inbox item is clicked
    const inboxes = document.querySelectorAll('.inbox');
    inboxes.forEach(inbox => {
        inbox.addEventListener('click', () => {
            menu.classList.remove('active'); // Ensure menu is not active
        });
    });

    // Dropdown functionality
    const dropdownButton = document.querySelector('.dropdown');
    const downElements = document.querySelectorAll('.down');

    dropdownButton.addEventListener('click', function () {
        downElements.forEach(element => {
            element.classList.toggle('show');
        });
    });

    // Toggle .menu-box visibility
    const plusButton = document.querySelector('.plus');
    const menuBox = document.querySelector('.menu-box');

    plusButton.addEventListener('click', function () {
        menuBox.classList.toggle('show');
    });
    const today = new Date();
    
    // Format the date (e.g., YYYY-MM-DD or any other format you prefer)
    const formattedDate = today.toLocaleDateString(); // Default format MM/DD/YYYY
    
    // Get the element with the class 'inboxdate'
    const dateElement = document.querySelector('.inboxdate');
    
    // Set the formatted date as the content of the element
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    const closeButton = document.querySelector('.closebutton');

    // Add a click event listener to the close button
    closeButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action of the link

        // Get the inbox container element
        const inboxContain = document.querySelector('.inbox-contain');

        // Set the display style to 'none' to hide the inbox container
        if (inboxContain) {
            inboxContain.style.display = 'none';
        }
    });
    const bell = document.querySelector('.bell');
    
    // Add a click event listener to the bell
    bell.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action of the link

        // Get the inbox container element
        const inboxContain = document.querySelector('.inbox-contain');

        // Set the display style to 'block' to show the inbox container
        if (inboxContain) {
            inboxContain.style.display = 'block';
        }
    });
    const form = document.getElementById('email');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const successMessage = document.querySelector('.success.w-form-done');
    const submitButton = form.querySelector('.submitbutton');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isChecked = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });

        if (isChecked) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });
    
    // const profileButton = document.getElementById('profile');
    // const inboxContain = document.querySelector('.inbox-contain');
    // profileButton.addEventListener('click', (event) => {
    //     inboxContain.style.display = 'block';
    // });
    // Fetch JSON data and render cards
    const frames = document.getElementById("loops");

    function fetchJSONData() {
        fetch("./main.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                data.user.forEach((user) => {
                    const frame = `
                        <div class="card">
                          <div class="flex">
                            <img id="top" src="${user.imgurl}" alt="img">
                            <div class="text-comp">
                                <p>${user.name}</p>
                                <p id="mail">${user.email}</p>
                                <div class="date1">${user.time}</div>
                            </div>
                          </div>
                          <hr>
                            <div class="all">
                                <div class="pic">
                                    <div class="component">
                                        <img src="${user.url}" alt="img">
                                        <img src="${user.img}" alt="img">
                                        <img src="${user.photo}" alt="img">
                                        <img src="${user.photos}" alt="img">
                                    </div>
                                    <div class="more">
                                        <p>${user.more}</p>
                                    </div>
                                </div>    
                                <div class="members">
                                    <p id="mem">${user.members}</p>
                                    <p id="join">${user.joining}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="day">
                                <div class="date">${user.time}</div>
                                <div class="block">${user.details}</div>
                            </div>
                        </div>
                    `;
                    frames.innerHTML += frame;
                });

                // Attach event listeners for newly added elements
                const dateElements = document.querySelectorAll('.date');
                const blockElements = document.querySelectorAll('.block');

                function toggleActiveClass(event) {
                    event.target.classList.toggle('active');
                }

                dateElements.forEach(dateElement => {
                    dateElement.addEventListener('click', toggleActiveClass);
                });

                blockElements.forEach(blockElement => {
                    blockElement.addEventListener('click', toggleActiveClass);
                });
            })
            .catch((error) => {
                console.error("Unable to fetch data:", error);
            });
    }

    // Call the function to fetch and display the data
    fetchJSONData();
});
