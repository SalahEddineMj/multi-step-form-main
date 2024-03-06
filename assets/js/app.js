const sliderContainer = document.querySelector("[data-slider-container]");
const sliderNextBtn = document.querySelector("[data-next-btn]");
const sliderPrevBtn = document.querySelector("[data-prev-btn]");
const steps = document.querySelectorAll("[data-step]");
const totalSlidableItems = sliderContainer.childElementCount - 1;
const resetPlan = document.querySelector("[data-reset-plan]");
const inputs = document.querySelectorAll("[data-input-field]");
const inputsEmptyError = document.querySelectorAll("[data-input-alert]")


const checkInputValueEmpty = () => {
  let isInputValueEmpty = false
  inputs.forEach((input, index) => {
  if (input.value !== "") {
    inputsEmptyError[index].style.display = "none";
  }
  else {
    inputsEmptyError[index].style.display = "block";
    isInputValueEmpty = true;
  }
})
  return isInputValueEmpty
}

let currentSliderPos = 0;


const reset = () => {
  resetPlan.addEventListener("click", () => {
    currentSliderPos = 1;
    moveSliderItem()
    moveStepItem()
    if (currentSliderPos <= totalSlidableItems - 1) {
      sliderNextBtn.classList.add("btn-primary");
      sliderNextBtn.classList.remove("btn-secondary");
      sliderNextBtn.textContent = "Next Step";
    }
  })
}
reset()

const moveSliderItem = () => {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSliderPos].offsetLeft}px)`;
};
moveStepItem = () => {
  steps.forEach((step, index) => {
    index === currentSliderPos
      ? step.classList.add("active")
      : step.classList.remove("active");
  });
};

const nextSlide = () => {
  if (currentSliderPos >= totalSlidableItems) return
    else {
    currentSliderPos++;
    if (currentSliderPos >= totalSlidableItems - 1) {
      sliderNextBtn.classList.remove("btn-primary");
      sliderNextBtn.classList.add("btn-secondary");
      sliderNextBtn.textContent = "Confirm";
    }
  }
  if (currentSliderPos === 4) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }
  moveSliderItem();
  moveStepItem();
  isFirstPage();
  currentSliderPos === 4 ? steps[3].classList.add("active") : "";
};

const prevSlide = () => {
  if (currentSliderPos <= 0) return
    else {
    currentSliderPos--
    sliderNextBtn.classList.add("btn-primary");
    sliderNextBtn.classList.remove("btn-secondary");
    sliderNextBtn.textContent = "Next Step";
  }
  moveSliderItem();
  moveStepItem();
  isFirstPage()
}

const isFirstPage = () => {
  if (currentSliderPos === 0) sliderPrevBtn.style.visibility = "hidden"
  else {
  sliderPrevBtn.style.visibility = "visible"
  }
}
isFirstPage()

sliderNextBtn.addEventListener("click", () => {
  if (checkInputValueEmpty()) return
  nextSlide();
});

sliderPrevBtn.addEventListener("click", prevSlide);
moveStepItem();

const plans = document.querySelectorAll("[data-plan]");
const planToggler = document.querySelector("[data-plan-toggler]");
const yearlyPlans = document.querySelectorAll("[data-yearly-gift]");
const addOns = document.querySelectorAll("[data-card-price]");
const choosePlan = document.querySelectorAll("[data-choose-plan]");
const totalPrice = document.querySelector("[data-total-price]");
const addOnsCards = document.querySelectorAll("[data-add-ons-card]");
const finalPlaneType = document.querySelector("[data-plan-type]");
const plansTitles = document.querySelectorAll("[data-plan-title]");
const totalType = document.querySelector("[data-total-type]");
const planPrice = document.querySelector("[data-price]");
const addOnsList = document.querySelector("[data-add-ons-list]");
const cardsTitles = document.querySelectorAll("[data-card-title]");

const yearlyPlanPricesList = [90, 128, 150];
const monthlyPlanPricesList = [9, 12, 15];

const monthlyAddOns = [1, 2, 2];
const yearlyAddOns = [10, 20, 20];

const monthly = document.querySelector(".monthly");
const yearly = document.querySelector(".yearly");

const switchPlan = (toggler) => {
  let regex = /\d+/g;
  plans.forEach((plan, index) => {
    plan.textContent = toggler.checked
      ? plan.textContent.replace("mo", "yr")
      : plan.textContent.replace("yr", "mo");
    let matchResult = Number(plan.textContent.match(regex));
    plan.textContent = toggler.checked
      ? plan.textContent.replace(matchResult, yearlyPlanPricesList[index])
      : plan.textContent.replace(matchResult, monthlyPlanPricesList[index]);
  });
  yearlyPlans.forEach((plan) => {
    toggler.checked
      ? plan.classList.add("active")
      : plan.classList.remove("active");
  });


  addOns.forEach((addOns, index) => {
    let matchResult = Number(addOns.textContent.match(regex));
    addOns.textContent = toggler.checked
      ? addOns.textContent.replace(matchResult, yearlyAddOns[index])
      : addOns.textContent.replace(matchResult, monthlyAddOns[index]);
    addOns.textContent = toggler.checked
      ? addOns.textContent.replace("mo", "yr")
      : addOns.textContent.replace("yr", "mo");
  });
  totalPrice.textContent = toggler.checked
    ? totalPrice.textContent.replace("mo", "yr")
    : totalPrice.textContent.replace("yr", "mo");
};

planToggler.addEventListener("change", () => {
  switchPlan(planToggler);
  isTogglerChecked(planToggler);
  customChosePlan();
  customAddOns();
  if (planToggler.checked) {
    let extractTotalType =  String(totalType.textContent.match(/month/g));
    totalType.textContent = totalType.textContent.replace(extractTotalType, "year");
    let planType = String(finalPlaneType.textContent.match(/Monthly/g));
    finalPlaneType.textContent = finalPlaneType.textContent.replace(planType, "Yearly")
    let extractPlanText = planPrice.textContent.match(/mo/);
    planPrice.textContent = planPrice.textContent.replace(extractPlanText, "yr");
  }
  else {
    let extractTotalType =  String(totalType.textContent.match(/year/g));
    totalType.textContent = totalType.textContent.replace(extractTotalType, "month")
    let planType = String(finalPlaneType.textContent.match(/Yearly/g));
    finalPlaneType.textContent = finalPlaneType.textContent.replace(planType, "Monthly")
    let extractPlanText = planPrice.textContent.match(/yr/);
    planPrice.textContent = planPrice.textContent.replace(extractPlanText, "mo");
  }
});

const isTogglerChecked = (toggler) => {
  if (toggler.checked) {
    yearly.classList.add("active");
    monthly.classList.remove("active");
  } else {
    yearly.classList.remove("active");
    monthly.classList.add("active");
  }
};
isTogglerChecked(planToggler);

let planValue;

choosePlan.forEach((box, index) => {
  box.addEventListener("change", () => {
    if (box.checked) {
      let extractNumber = Number(totalPrice.textContent.match(/\d+/g));
      planValue = Number(plans[index].textContent.match(/\d+/g));
      extractNumber = planValue;
      totalPrice.textContent = totalPrice.textContent.replace(/\d+/g,extractNumber);
      customAddOns();
      let extractPlaneType = String(finalPlaneType.textContent.match(/Arcade|Advanced|Pro/g));
      finalPlaneType.textContent = finalPlaneType.textContent.replace(extractPlaneType, plansTitles[index].textContent);
      let extractPlanPrice = Number(planPrice.textContent.match(/\d+/g));
      planPrice.textContent = planPrice.textContent.replace(extractPlanPrice, planValue);
    }
  });
});

const customChosePlan = () => {
  choosePlan.forEach((box, index) => {
      if (box.checked) {
        let extractNumber = Number(totalPrice.textContent.match(/\d+/g));
        planValue = Number(plans[index].textContent.match(/\d+/g));
        extractNumber = planValue;
        totalPrice.textContent = totalPrice.textContent.replace(/\d+/g,extractNumber);
        let extractPlanPrice = Number(planPrice.textContent.match(/\d+/g));
        planPrice.textContent = planPrice.textContent.replace(extractPlanPrice, planValue);
      };
      
  });
};
customChosePlan()

addOnsCards.forEach((addOnsCard, index) => {
  addOnsCard.addEventListener("change", () => {
    let Price = Number(totalPrice.textContent.match(/\d+/g));
    if (addOnsCard.checked) {
      Price += Number(addOns[index].textContent.match(/\d+/g));
      totalPrice.textContent = totalPrice.textContent.replace(/\d+/g, Price);

      let liItem = document.createElement("li");
      liItem.classList.add("item");
      liItem.id = addOnsCard.nextElementSibling.id
      let liText = document.createElement("span");
      liText.classList.add("add-ons-text");
      liText.textContent = cardsTitles[index].textContent;
      liItem.appendChild(liText);
      let liPrice = document.createElement("span");
      liPrice.classList.add("add-ons-price");
      liPrice.textContent = addOns[index].textContent
      liItem.appendChild(liPrice);
      addOnsList.appendChild(liItem);
    }
    else {
      totalPrice.textContent = totalPrice.textContent.replace(/\d+/g, Price);
      Array.from(addOnsList.children).forEach((ele) => {
        ele.id === addOnsCard.nextElementSibling.id ? ele.remove() : ""
      })
      if (totalPrice <= 0) return
      else {
        Price -= Number(addOns[index].textContent.match(/\d+/g));
        totalPrice.textContent = totalPrice.textContent.replace(/\d+/g, Price)
      }
    }
  });
});

const customAddOns = () => {
  addOnsCards.forEach((addOnsCard, index) => {
      let Price = Number(totalPrice.textContent.match(/\d+/g));
      if (addOnsCard.checked) {
        Price += Number(addOns[index].textContent.match(/\d+/g));
        totalPrice.textContent = totalPrice.textContent.replace(/\d+/g, Price);
        if (addOnsList.children.length > 0) {
          Array.from(addOnsList.children).forEach(ele => {
            ele.id === addOnsCard.nextElementSibling.id ? ele.children[1].textContent =  addOns[index].textContent : "";
          })
        }
      }
  });
}