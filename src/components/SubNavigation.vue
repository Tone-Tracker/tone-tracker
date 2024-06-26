<template>
    <div class="side-nav">
        <div class="profile">
            <div class="profile-info">
                <span class="name">Luc Belaire</span>
                <span class="status">Guest</span>
            </div>
            <button class="edit-profile-btn">
                ✏️
            </button>
        </div>
        <ul class="nav-list">
            <li><a href="#"><span class="icon">💬</span> All</a></li>
            <li><a href="#"><span class="icon">✉️</span> Message center</a></li>
            <li><a href="#"><span class="icon">📄</span> Briefs</a></li>
            <li><a href="#"><span class="icon">📤</span> Upload contract</a></li>
            <li><a href="#"><span class="icon">📨</span> Sent</a></li>
            <li><a href="#"><span class="icon">📩</span> Unread</a></li>
            <li><a href="#"><span class="icon">⬇️</span> Show more</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideNav',
};
</script>

<style scoped>
.side-nav {
    width: 250px;
    background-color: #000;
    /* color: #fff; */
    /* padding: 20px; */
    /* font-family: Arial, sans-serif; */
}

.profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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