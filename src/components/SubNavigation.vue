<template>
    <div class="accordion" id="accordionPanelsStayOpenExample">

        <div class="side-nav">
            <div class="accordion-item">
                <div class="accordion-header profile">
                    <button class="d-flex align-items-start justify-content-between accordion-button" type="button"
                        data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne">
                        <div class="profile-info">
                            <span class="name">Luc Belaire</span>
                            <span class="status">Guest</span>
                            <!-- <span class="edit-profile"> <button class="edit-profile-btn">
                                    ✏️
                                </button>
                            </span> -->

                        </div>


                    </button>
                </div>

                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="nav-list">
                            <li><a href="#"><span class="icon">💬</span> All</a></li>
                            <li><a href="#"><span class="icon">✉️</span> Message center</a></li>
                            <li><a href="#"><span class="icon">📄</span> Briefs</a></li>
                            <li><a href="#"><span class="icon">📤</span> Upload contract</a></li>
                            <li><a href="#"><span class="icon">📨</span> Sent</a></li>
                            <li><a href="#"><span class="icon">📩</span> Unread</a></li>
                        </ul>

                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="d-flex gap-2 justify-content-end flex-row-reverse accordion-button w-0 collapsed "
                        type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Show more
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                        collapse plugin adds the appropriate classes that we use to style each element. These classes
                        control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                        modify any of this with custom CSS or overriding our default variables. It's also worth noting
                        that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                        does limit overflow.
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'SideNav',
};
</script>

<style scoped>
.profile .accordion-button::after {
    margin-bottom: 10px;
}

.accordion-button::after {
    margin: 0 !important;
}

.side-nav {
    width: 250px;
    background-color: #000;
    color: #fff;
    /* padding: 20px; */
    /* font-family: Arial, sans-serif; */
}

.profile {
    /* padding: 20px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 18px;
    font-weight: bold;
}

.status {
    font-size: 14px;
    color: red;
}

.edit-profile-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
}

.nav-list {
    list-style: none;
    padding: 0;
}

.nav-list li {
    margin: 15px 0;
}

.nav-list a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.nav-list .icon {
    margin-right: 10px;
}

.nav-list a:hover {
    text-decoration: underline;
}
</style>