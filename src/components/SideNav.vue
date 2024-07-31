<script setup>
import CLIENT from './navigations/CLIENT.vue';
import TTG_SUPER_ADMIN from './navigations/TTG_SUPER_ADMIN.vue';
import TTG_REGIONAL_MANAGER from './navigations/TTG_REGIONAL_MANAGER.vue';
import TTG_HEAD_ADMIN from './navigations/TTG_HEAD_ADMIN.vue';
import TTG_ACTIVATION_MANAGER from './navigations/TTG_ACTIVATION_MANAGER.vue';

import { useAuth } from '@/stores/auth';

const auth = useAuth();
const user = JSON.parse(auth.user);

const getUserRole = (role) => {
    return user.role == role
};
</script>

<template>
    <div class="sidebar-container">
        <!-- Vertical Sidebar -->
        <div class="vertical-sidebar">
            <div class="icon-wrapper" title="Dashboard">
                <i class="icon dashboard-icon">📊</i>
            </div>
            <div class="icon-wrapper" title="Messages">
                <i class="icon messages-icon">💬</i>
            </div>
            <div class="icon-wrapper" title="Projects">
                <i class="icon projects-icon">📁</i>
            </div>
        </div>

        <!-- Main Sidebar -->
        <div class="main-sidebar">
            <div class="user-info">
                <div class="user-avatar">
                    <img src="/src/assets/images/avatars/avatar-1.png" alt="User Avatar">
                </div>
                <div class="user-name-role">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-role">{{ user.role }}</div>
                </div>
            </div>
            
            <div class="menu">
                <div class="menu-section">
                    <div class="menu-item">
                        <i class="icon all-icon">📋</i> All
                    </div>
                    <div class="menu-item">
                        <i class="icon unread-icon">📨</i> Unread
                    </div>
                    <div class="menu-item">
                        <i class="icon sent-icon">📤</i> Sent
                    </div>
                    <div class="menu-item">
                        <i class="icon draft-icon">📝</i> Draft
                    </div>
                    <div class="menu-item">
                        <i class="icon show-more-icon">🔽</i> Show more
                    </div>
                </div>

                <div class="menu-section">
                    <div class="section-title">Projects</div>
                    <div class="menu-item">
                        <i class="icon project-icon">🏢</i> Joburg Activations
                    </div>
                    <div class="menu-item">
                        <i class="icon project-icon">🏢</i> Durban Activations
                    </div>
                    <div class="menu-item">
                        <i class="icon project-icon">🏢</i> Cape Town Activations
                    </div>
                </div>

                <div class="menu-section">
                    <div class="section-title">Channels</div>
                    <div class="menu-item">
                        <i class="icon channel-icon">📣</i> Marketing-team
                    </div>
                    <div class="menu-item">
                        <i class="icon channel-icon">📣</i> Competitive
                    </div>
                    <div class="menu-item">
                        <i class="icon channel-icon">📣</i> Announcements
                    </div>
                    <div class="menu-item">
                        <i class="icon channel-icon">📣</i> Quarterly planning
                    </div>
                </div>

                <div class="menu-section">
                    <div class="section-title">Direct Messages</div>
                    <div class="menu-item">
                        <i class="icon dm-icon">👤</i> Guest (You)
                    </div>
                    <div class="menu-item">
                        <i class="icon dm-icon">👤</i> Brandley Thomas
                    </div>
                    <div class="menu-item">
                        <i class="icon dm-icon">👤</i> Michael John
                    </div>
                </div>

                <div class="menu-section">
                    <div class="section-title">Communities</div>
                    <div class="menu-item">
                        <i class="icon community-icon">🌐</i> Community 1
                    </div>
                    <div class="menu-item">
                        <i class="icon community-icon">🌐</i> Community 2
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-container {
    display: flex;
}

.vertical-sidebar {
    width: 50px;
    background-color: #1a1a1a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    transition: width 0.3s;
}

.vertical-sidebar:hover {
    width: 200px;
}

.icon-wrapper {
    margin: 10px 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

.icon-wrapper i {
    font-size: 24px;
}

.main-sidebar {
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 10px;
    width: 250px;
    transition: margin-left 0.3s;
}

.vertical-sidebar:hover + .main-sidebar {
    margin-left: 200px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.user-avatar img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.user-name-role {
    margin-left: 10px;
}

.user-name {
    font-weight: bold;
}

.user-role {
    color: #ccc;
}

.menu {
    font-size: 14px;
}

.menu-section {
    margin-bottom: 20px;
}

.section-title {
    font-weight: bold;
    margin-bottom: 10px;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
}

.menu-item i {
    margin-right: 10px;
}

.menu-item:hover {
    background-color: #333;
}
</style>
