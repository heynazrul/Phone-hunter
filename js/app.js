const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.innerHTML = '';
  //   Display 10 phones only
  const showAll = document.getElementById('show-all');

  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  } else {
    showAll.classList.add('d-none');
  }

  // Display no phones found
  const noPhoneDiv = document.getElementById('no-phone-found');
  if (phones.length === 0) {
    noPhoneDiv.classList.remove('d-none');
  } else {
    noPhoneDiv.classList.add('d-none');
  }

  //   Display all phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card">
            <img src=${phone.image} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                This is a longer card with supporting text below as a natural lead-in to additional content. This
                content is a little bit longer.
                </p>
                <button onClick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
    `;
    phonesContainer.appendChild(phoneDiv);
    toggleSpinner(false);
  });
};

// function how pass data load limit with button
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

// Handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
  processSearch(10);
});

// Search input field by Enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
  }
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  } else {
    loaderSection.classList.add('d-none');
  }
};

document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailsModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
      <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date'}</p>
      <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage info found'}</p>
      <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Info'}</p>
  `;
};

loadPhone('apple');
