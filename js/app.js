const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-conatiner');
    phonesContainer.textContent = ``;
    //display 10 items initially
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-phones-message');
    if (phones.length === 0) {
        noPhone.classList.replace('d-none', 'd-block');
    }
    else {
        noPhone.classList.replace('d-block', 'd-none');
    }


    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card text-center">
            <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bolder">${phone.phone_name}</h5>
                <p class="card-text fw-semibold">Brand: <span class="text-success">${phone.brand}</span></p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);


    });
    toggleSplinner(false);

}

const processSearch = (dataLimit) => {
    toggleSplinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {

    processSearch(10);

});

//enter key handler on input field

document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSplinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function (event) {

    processSearch();

});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = (details) => {
    console.log(details);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = details.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `

     <p>Release Date: ${details.releaseDate ? details.releaseDate : 'No RD Found!'}</p>
     <p>Blutooth: ${details.others ? details.others.Bluetooth : 'NF'}</p>
     <p>Memory: ${details.mainFeatures ? details.mainFeatures.memory : 'NF'}</p>
     <p>Memory: ${details.mainFeatures ? details.mainFeatures.sensors.join(' | ') : 'NF'}</p>
    `;
}

loadPhone('apple');
