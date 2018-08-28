const getInfo = (() => {
    let queryObj;
    let user;

    let $name;
    let $address;
    let $primaryNumber;
    let $email;
    let $emailAgain;
    let $description;
    let $contactPerson;
    let $primaryNumber2;
    let $secondaryNumber;
    let $website;
    let $savedReviews;
    let $reviewRationInput;
    let $star1, $star2, $star3, $star4, $star5;
    let $coverImage;
    let $sponsoredPopular;
    let $openNow;
    let $verifiedBadge;
    let $relatedTuitionContainer;
    let $categoryPills;
    let $opration_hours_containers, $opration_hours_containers2;
    let $facilities_container;
    let $category_container;
    let $linkContainer;
    let $coursesContainer;
    let $resultsContainer;
    let $facultyContainer;
    let $gallery;
    let $claimButton;
    let $curriculum, $grades, $typeOfSchooling, $headOfSchool, $founded;
    let $activityContainer;
    let $feeDetails, $admissionProcess, $eligibilityCriteria;
    let $datesContainer;


    function cache() {
        $name = $('.container #tuition_name');
        $address = $('.container #address');
        $primaryNumber = $('.container #phone');
        $email = $('.container #email');
        $emailAgain = $('.container #emailAgain');
        $description = $('.container #description');
        $contactPerson = $('.container #contact_person');
        $primaryNumber2 = $('.container #primary_number');
        $secondaryNumber = $('.container #alternate_number');
        $website = $('.container #website');
        $savedReviews = $('#savedReviews');
        $reviewRationInput = $('#reviewRatingInput');
        $star1 = $('#star1');
        $star2 = $('#star2');
        $star3 = $('#star3');
        $star4 = $('#star4');
        $star5 = $('#star5');
        $coverImage = $('#cover_image');
        $sponsoredPopular = $("#sponsoredPopular");
        $openNow = $('#openNow');
        $verifiedBadge = $('#verifiedBadge');
        $relatedTuitionContainer = $("#relatedTuitionContainer");
        $categoryPills = $('#categoryPills');
        $opration_hours_containers = $("#opration_hours_containers");
        $opration_hours_containers2 = $("#opration_hours_containers2");
        $facilities_container = $('#facilities_container');
        $category_container = $('#category_container');
        $linkContainer = $("#linkContainer");
        $coursesContainer = $("#coursesContainer");
        $resultsContainer = $("#resultsContainer");
        $facultyContainer = $("#facultyContainer");
        $gallery = $("#gallery");
        $claimButton = $('#claimButton');
        $curriculum = $('#curriculum');
        $grades = $('#grades');
        $typeOfSchooling = $('#typeOfSchooling');
        $headOfSchool = $('#headOfSchool');
        $founded = $('#founded');
        $activityContainer = $('#activityContainer');
        $feeDetails = $('#fee');
        $admissionProcess = $('#admission_process');
        $eligibilityCriteria = $('#eligibility_criteria');
        $datesContainer = $('#dates_Container');
    }

    function bindEvents() {

    }

    function getInfoFromDatabase(typeOfInfo) {
        if (typeOfInfo === 'tuition') {
            const url = '/tuition';
            const data = {_id: queryObj._id};
            return $.ajax({url, data});
        }
        if (typeOfInfo === 'school') {
            const url = '/school';
            const data = {_id: queryObj._id};
            return $.ajax({url, data});
        }

    }

    function getReviews(reviewsArray) {
        if (reviewsArray === undefined || reviewsArray === []) {
            return;
        }
        let avgRating = helperScripts.calcAverageRating(reviewsArray);
        changeColorOfStars(avgRating);
        let toAppend = '';
        reviewsArray.forEach(obj => {
            toAppend += template.tuitionReviews(obj)
        });
        $savedReviews.append(toAppend)
    }

    function changeColorOfStars(rating) {
        if (rating === -1) {
            rating = 2.5;
        }
        let array = [$star1, $star2, $star3, $star4, $star5];
        for (let i = 0; i <= rating - 1; i++) {
            array[i].css('color', '#00bcd4')
        }
    }

    function updateBasicInfo(infoObj, typeOfInfo) {

        $name.html(infoObj.name);
        $address.html(infoObj.addressLine1 + ',' + infoObj.addressLine2 + ',' + infoObj.city + ',' + infoObj.pin);
        $primaryNumber.html(infoObj.primaryNumber);
        $email.html(infoObj.email);
        $emailAgain.html(infoObj.email);
        $description.html(infoObj.description);
        $contactPerson.html(infoObj.contactPerson);
        $primaryNumber2.html(infoObj.secondaryNumber);
        $secondaryNumber.html(infoObj.secondaryNumber);
        $website.html(infoObj.website);

        if (typeOfInfo === 'school') {
            //only for schools
            $curriculum.html(infoObj.curriculum);
            let array = infoObj.grades.split(',');
            $grades.html(array[0] + ' to ' + array[array.length - 1]);
            $typeOfSchooling.html(infoObj.type);
            $headOfSchool.html(infoObj.principalName);
            $founded.html(infoObj.yearFounded);
        }

    }

    function updateCoverImage(coverPic) {
        if (coverPic === undefined || coverPic === '') {
            $coverImage.attr("src", "/assets/img/fourgirls.jpeg");
        } else {
            $coverImage.attr('src', 'images/' + coverPic);
        }
    }

    function updateClaimButtonHTML(claimedBy) {
        if (claimedBy) {
            $claimButton.html(`<i class="material-icons">
                                done
                            </i>
                            Claimed`);
            $claimButton.attr('disabled', 'true');
        } else {
            $claimButton.html(`Claim This Page`);
        }
    }

    function updateOpenNow(data, typeOfInfo) {
        helperScripts.openNowInit(data, typeOfInfo);
        if (data.openedNow) {
            $openNow.append(`<span class="badge badge-pill badge-success">open now</span>`)
        }
    }

    function updateVerifiedBadge(claimedBy) {
        if (claimedBy === undefined || claimedBy === '') {
        } else {
            $verifiedBadge.removeAttr('hidden')
        }
    }

    function updateCategoryPills(category) {
        if (category === undefined || category === '') {
            // do nothing
        } else {
            // show pills
            let toAppend = '';
            category.split(',').forEach(category => {
                toAppend += `<span class="badge badge-pill badge-info">${category}</span>`
            });

            $categoryPills.append(toAppend);
        }
    }

    function updateFacilities(facilities) {
        const facilityArr = facilities ? facilities.split(',') : [];
        let result1 = template.tuitionFacility({facilities: facilityArr});
        $facilities_container.html(result1);
    }

    function updateCategories(categories) {
        const categoryArr = categories ? categories.split(',') : [];
        let result2 = template.tuitionCategory({categories: categoryArr});
        $category_container.html(result2);
    }

    function showActivities(activitiesArr) {
        if (activitiesArr === undefined || activitiesArr.length === 0) {
            $activityContainer.append('Nothing To Show');
            return;
        }
        let toAppend = '';
        activitiesArr.forEach(activity => {
            toAppend += `<div class="card col-md-5 m-1">
                             <div class="card-body">
                                <h4 class="card-title m-0">${activity}</h4>
                             </div>
                         </div>`
        });
        $activityContainer.append(toAppend);
    }

    function showAdmissionAndFeeInfo(fee, admissionProcess, eligibilityCriteria) {
        $feeDetails.append(fee);
        $admissionProcess.append(admissionProcess);
        $eligibilityCriteria.append(eligibilityCriteria);
    }

    function showImportantDates(datesArr) {
        let toAppend = '';
        datesArr.forEach(obj => {
            if (obj.date && obj.title) {
                toAppend += `
                <div class="col-md-4">
                   <h5 class="font-weight-bold">${obj.title}</h5>
                   <p>${obj.date}</p>
                </div>
                `
            }
        });
        $datesContainer.append(toAppend);
    }

    function showCourses(array) {
        let context = {
            courses: []
        };

        let counter = 1;
        array.forEach((obj) => {
            let newObj = {
                id: counter,
                title: obj.title,
                duration: obj.duration,
                fee: obj.fee,
                ageGroup: obj.ageGroup,
                nextBatch: obj.nextBatch ? obj.nextBatch.split('T')[0] : ''
            };
            context.courses.push(newObj);
            counter++;
        });
        let result = template.tuitionCourses(context);
        $coursesContainer.append(result);
    }

    function showResults(array) {
        let context = {
            results: []
        };

        let counter = 1;
        array.forEach((obj) => {
            let newObj = {
                id: counter,
                img_path: obj.img_path,
                title: obj.title,
                description: obj.description,
            };
            context.results.push(newObj);
            counter++;
        });

        let result = template.tuitionResult(context);
        $resultsContainer.append(result);

    }

    function showFaculty(array) {
        let context = {
            faculty: []
        };

        let counter = 1;
        array.forEach((obj) => {
            let newObj = {
                id: counter,
                img_path: obj.img_path,
                name: obj.name,
                description: obj.description,
                qualification: obj.qualification
            };
            context.faculty.push(newObj);
            counter++;
        });

        let result = template.tuitionFaculty(context);
        $facultyContainer.append(result);

    }

    function showGallery(array) {
        if (array === undefined || array === [] || array.length === 0) {
            $gallery.append(`<p>Nothing to show</p>`);
            return
        }
        let result = '';
        array.forEach(imgPath => {
            result += template.galleryImg({path: imgPath});
        });
        $gallery.append(result);
    }

    function updateSocialLinks(f, i, y) {
        let context = {
            // twitter: t,
            facebook: f == "" ? '#' : f,
            instagram: i == "" ? '#' : i,
            youtube: y == "" ? '#' : y
        };

        let result = template.tuitionLinks(context);
        $linkContainer.append(result);
    }

    function updateDaynTime(array, $targetElement) {
        if (array === undefined || array === []) {
            return;
        }
        let context = {
            monFrom: '',
            monTo: '',
            tueFrom: '',
            tueTo: '',
            wedFrom: '',
            wedTo: '',
            thrFrom: '',
            thrTo: '',
            friFrom: '',
            friTo: '',
            satFrom: '',
            satTo: '',
            sunFrom: '',
            sunTo: '',
        };
        array.forEach((obj) => {
            let expr = obj.day.toLowerCase();
            switch (expr) {
                case 'monday':
                    context.monFrom = obj.fromTime;
                    context.monTo = obj.toTime;
                    break;
                case 'tuesday':
                    context.tueFrom = obj.fromTime;
                    context.tueTo = obj.toTime;
                    break;
                case 'wednesday':
                    context.wedFrom = obj.fromTime;
                    context.wedTo = obj.toTime;
                    break;
                case 'thursday':
                    context.thrFrom = obj.fromTime;
                    context.thrTo = obj.toTime;
                    break;
                case 'friday':
                    context.friFrom = obj.fromTime;
                    context.friTo = obj.toTime;
                    break;
                case 'saturday':
                    context.satFrom = obj.fromTime;
                    context.satTo = obj.toTime;
                    break;
                case 'sunday':
                    context.sunFrom = obj.fromTime;
                    context.sunTo = obj.toTime;
                    break;
            }
        });
        let result = template.tuitionOperationHours(context);
        $targetElement.append(result);
    }

    function getRelatedListing(city) {
        if (!city) {
            return
        }
        // todo - fix Algorithm to get related listing
        // maybe add server side route to get this
        let promise = $.ajax({
            url: '/tuition/search',
            data: {
                city: JSON.stringify({
                    search: city,
                    fullText: true
                }),
                demands: 'name addressLine1 addressLine2 city state primaryNumber email category description claimedBy dayAndTimeOfOperation reviews',
                limit: 3,
                skip: 0,
                sortBy: ''
            }
        });

        let result = '';

        promise.then((data) => {
            if (data === undefined) {
                return
            }
            if (data.length === 0) {

            } else {
                data.forEach(obj => {
                    helperScripts.openNowInit(obj);
                    obj.averageRating = helperScripts.calcAverageRating(obj.reviews);
                    obj.averageRating = obj.averageRating === -1 ? 2.5 : obj.averageRating;
                    result += template.smoothCardHomePage(obj);
                });
                $relatedTuitionContainer.append(result);
            }

        }).catch(err => {
            console.log(err);
        });
    }

    function getPopularListing(city, typeOfInfo) {
        if (!city) {
            return
        }
        // todo - fix Algorithm to get related listing
        // maybe add server side route to get this

        let promise;
        if (typeOfInfo === 'tuition') {
            promise = $.ajax({
                url: '/tuition/search',
                data: {
                    city: JSON.stringify({
                        search: city,
                        fullText: true
                    }),
                    demands: 'name addressLine1 addressLine2 city state primaryNumber email category description claimedBy dayAndTimeOfOperation reviews',
                    limit: 2,
                    skip: 0,
                    sortBy: 'views'
                }
            });
        }
        if (typeOfInfo === 'school') {
            promise = $.ajax({
                url: '/school/search',
                data: {
                    city: JSON.stringify({
                        search: city,
                        fullText: true
                    }),
                    demands: 'name addressLine1 addressLine2 city state primaryNumber email category description claimedBy dayAndTimeOfOperation reviews',
                    limit: 2,
                    skip: 0,
                    sortBy: 'views'
                }
            });
        }

        let result = '';

        promise.then((data) => {
            if (data === undefined) {
                return
            }
            if (data.length === 0) {

            } else {
                data.forEach(obj => {
                    helperScripts.openNowInit(obj);
                    obj.averageRating = helperScripts.calcAverageRating(obj.reviews);
                    obj.averageRating = obj.averageRating === -1 ? 2.5 : obj.averageRating;
                    result += template.smoothCardHomePage(obj);
                });
                $sponsoredPopular.append(result);
            }

        }).catch(err => {
            console.log(err);
        });
    }

    function updateUser(userInfo) {
        user = userInfo;
    }

    function render(obj, typeOfInfo) {
        queryObj = obj;
        cache();
        bindEvents();
        getInfoFromDatabase(typeOfInfo)
            .then(InfoObj => {
                PubSub.publish('address.ready', InfoObj.addressLine1 + ',' + InfoObj.addressLine2 + ',' + InfoObj.city + ',' + InfoObj.state);

                updateBasicInfo(InfoObj, typeOfInfo);
                updateOpenNow(InfoObj, typeOfInfo);
                updateCoverImage(InfoObj.img_tuitionCoverPic);
                updateClaimButtonHTML(InfoObj.claimedBy);
                updateVerifiedBadge(InfoObj.claimedBy);
                updateFacilities(InfoObj.facilities);
                updateCategories(InfoObj.category);
                getReviews(InfoObj.reviews);
                getPopularListing(InfoObj.city, typeOfInfo);
                updateCategoryPills(InfoObj.category);

                setTimeout(() => updateSocialLinks(InfoObj.fbLink, InfoObj.instaLink, InfoObj.youtubeLink));
                setTimeout(() => showResults(InfoObj.bragging));
                setTimeout(() => showFaculty(InfoObj.team));

                if (typeOfInfo === 'tuition') {
                    setTimeout(() => updateDaynTime(InfoObj.dayAndTimeOfOperation, $opration_hours_containers));
                    setTimeout(() => showCourses(InfoObj.courses));
                    setTimeout(() => showGallery(InfoObj.gallery));
                }
                if (typeOfInfo === 'school') {
                    setTimeout(() => updateDaynTime(InfoObj.schoolTiming, $opration_hours_containers));
                    setTimeout(() => updateDaynTime(InfoObj.officeTiming, $opration_hours_containers2));
                    setTimeout(() => showActivities(InfoObj.activities));
                    setTimeout(() => showAdmissionAndFeeInfo(InfoObj.fee, InfoObj.admissionProcess, InfoObj.eligibilityCriteria));
                    setTimeout(() => showImportantDates(InfoObj.importantDates));
                }
                // getRelatedListing(tuitionInfoObj.city);
            })
            .catch(err => console.error(err));
    }

    return {render, updateUser}
})();