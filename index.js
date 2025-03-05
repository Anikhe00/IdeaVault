// Button
let addResearchBtn = document.getElementById("add-btn")
let modalOverlay = document.getElementById("modal-overlay")
let closeIcon = document.getElementById("close-icon")

// form
let form = document.getElementById("form")
let resourceNameInput = document.getElementById("resource-name")
let descriptionInput = document.getElementById("item-desc")
let resourceLinkInput = document.getElementById("resource-link")

// item section
let itemSection = document.getElementById("research-container")

// Reveal Modal
addResearchBtn.addEventListener("click", revealModalOverlay)
function revealModalOverlay(){
  modalOverlay.classList.remove("modal-overlay")
  modalOverlay.classList.add("modal-overlay-visible")
  resourceNameInput.focus()
}

// Close Modal
closeIcon.addEventListener("click", closeModalOverlay)
function closeModalOverlay(){
  if(modalOverlay.classList.contains("modal-overlay-visible")){
    modalOverlay.classList.remove("modal-overlay-visible")
    modalOverlay.classList.add("modal-overlay")
  }
}

// Collect data and save to Local storage
let researchResources = []

form.addEventListener("submit", collectFormData)
function collectFormData(event){
  event.preventDefault()

  let resourceName = resourceNameInput.value
  let resorceDescription = descriptionInput.value
  let resourceLink = resourceLinkInput.value

  const resourceItem = {
    itemName : resourceName,
    itemDescription : resorceDescription,
    itemLink : resourceLink
  }

  researchResources.push(resourceItem)

  // Push data in local storage
  localStorage.setItem("researchItems", JSON.stringify(researchResources))

  // Reset form
  form.reset()

  // Close Modal after pushing data to local storage
  closeModalOverlay()

  fetchItems()
}

// Retrieve data from local storage
function fetchItems(){
  if(localStorage.getItem("researchItems")){
    researchResources = JSON.parse(localStorage.getItem("researchItems"))
  }

  printItems()
}
fetchItems()

// Print data on UI
function printItems(){
  // Clear previous content before re-rendering
  itemSection.innerHTML = ``

  researchResources.forEach((item, index)=>{
    // Extract data
    let resourceItemName = item.itemName
    let resourceItemDesc = item.itemDescription
    let resourceItemLink = item.itemLink

    // Create card
    let researchItemContainer = document.createElement("div")
    researchItemContainer.classList.add("item-card")

    let titleAndActions = document.createElement("div")
    titleAndActions.classList.add("name-and-actions")

    let researchItemTitle = document.createElement("h2")
    researchItemTitle.classList.add("research-title")
    researchItemTitle.textContent = resourceItemName

    let researchItemDescription = document.createElement("p")
    researchItemDescription.classList.add("research-desc")
    researchItemDescription.textContent = resourceItemDesc

    let actions = document.createElement("div")
    actions.classList.add("actions")

    let editIcon = document.createElement("svg")
    editIcon.classList.add("edit", "icon")
    editIcon.innerHTML = ` <svg class="edit icon" id="edit-icon" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6665 12L13.9998 12.7294C13.6461 13.1161 13.1666 13.3333 12.6666 13.3333C12.1666 13.3333 11.687 13.1161 11.3334 12.7294C10.9793 12.3434 10.4998 12.1267 9.99996 12.1267C9.50009 12.1267 9.02059 12.3434 8.66649 12.7294M2.6665 13.3333H3.78287C4.10899 13.3333 4.27205 13.3333 4.4255 13.2965C4.56155 13.2638 4.69161 13.21 4.8109 13.1368C4.94546 13.0544 5.06076 12.9391 5.29136 12.7085L13.6665 4.33333C14.2188 3.78104 14.2188 2.88561 13.6665 2.33333C13.1142 1.78104 12.2188 1.78104 11.6665 2.33333L3.29134 10.7085C3.06074 10.9391 2.94544 11.0544 2.86298 11.1889C2.78988 11.3082 2.73601 11.4383 2.70334 11.5744C2.6665 11.7278 2.6665 11.8909 2.6665 12.217V13.3333Z" stroke="currenColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`


    let deleteIcon = document.createElement("svg")
    deleteIcon.classList.add("delete", "icon")
    deleteIcon.innerHTML = `<svg class="delete icon" id="delete-icon" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.6665 2H10.6665M2.6665 4H14.6665M13.3332 4L12.8656 11.0129C12.7955 12.065 12.7604 12.5911 12.5332 12.99C12.3331 13.3412 12.0313 13.6235 11.6676 13.7998C11.2545 14 10.7272 14 9.67273 14H7.66027C6.60577 14 6.07852 14 5.6654 13.7998C5.30168 13.6235 4.9999 13.3412 4.79983 12.99C4.57258 12.5911 4.53751 12.065 4.46736 11.0129L3.99984 4M7.33317 7V10.3333M9.99984 7V10.3333" stroke="currenColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`

    // Append
    actions.append(editIcon, deleteIcon)
    titleAndActions.append(researchItemTitle, actions)
    researchItemContainer.append(titleAndActions, researchItemDescription)

    itemSection.append(researchItemContainer)


    // Open card link
    researchItemContainer.addEventListener("click", function(){
      window.open(resourceItemLink, "_blank")
    })

    // Delete data
    deleteIcon.addEventListener("click", function(event){
      // Prevent the parent click event 
      event.stopPropagation()

      // Remove item for the array
      researchResources.splice(index, 1)

      // 
      localStorage.setItem("researchItems", JSON.stringify(researchResources))

      printItems();
    })
  })
}
