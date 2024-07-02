/**
Author: Mazisi Msebele
Date: 04/06/2024
**/
<template>
  <Layout>
    <!--start page wrapper -->
    <div class="page-wrapper">
      <div class="page-content">

        <!-- <BreadCrumb title="Report" icon="bx bx-line-chart" /> -->
        <div class="main-dashboard-head d-flex justify-content-between">
          <div>
            <div class="d-flex align-items-center gap-3 justify-content-center">
              <span>
                <svg class="page-icon" width="70" height="70" viewBox="0 0 70 70" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M66.758 64.117H60.9583V61.2084H58.0497V64.117H52.2587V61.2084H49.3501V64.117H43.5504V61.2084H40.6418V64.117H34.8421V61.2084H31.9335V64.117H26.1337V61.2084H23.2251V64.117H10.4499L25.7476 54.9239L33.318 32.7989L44.5634 52.5639L66.3547 16.2559L61.3792 13.266L44.697 41.0631L31.9944 18.7378L20.9378 51.0399L5.79975 60.1372V0.25H0V69.9167H69.6667V61.2084H66.7581L66.758 64.117ZM66.758 0.25H69.6666V3.15858H66.758V0.25ZM58.0497 0.25H60.9583V3.15858H58.0497V0.25ZM49.3501 0.25H52.2587V3.15858H49.3501L49.3501 0.25ZM40.6417 0.25H43.5503V3.15858H40.6418L40.6417 0.25ZM31.9334 0.25H34.842V3.15858H31.9335L31.9334 0.25ZM23.2251 0.25H26.1336V3.15858H23.2251L23.2251 0.25ZM14.5167 0.25H17.4253V3.15858H14.5168L14.5167 0.25ZM5.80839 0.25H8.71697V3.15858H5.80846L5.80839 0.25ZM66.758 8.95834H69.6666V11.8669H66.758V8.95834ZM58.0497 8.95834H60.9583V11.8669H58.0497V8.95834ZM49.3501 8.95834H52.2587V11.8669H49.3501L49.3501 8.95834ZM40.6417 8.95834H43.5503V11.8669H40.6418L40.6417 8.95834ZM31.9334 8.95834H34.842V11.8669H31.9335L31.9334 8.95834ZM23.2251 8.95834H26.1336V11.8669H23.2251L23.2251 8.95834ZM14.5167 8.95834H17.4253V11.8669H14.5168L14.5167 8.95834ZM5.80839 8.95834H8.71697V11.8669H5.80846L5.80839 8.95834ZM66.758 17.658H69.6666V20.5666H66.758V17.658ZM49.3501 17.658H52.2587V20.5666H49.3501L49.3501 17.658ZM40.6417 17.658H43.5503V20.5666H40.6418L40.6417 17.658ZM23.2251 17.658H26.1336V20.5666H23.2251L23.2251 17.658ZM14.5167 17.658H17.4253V20.5666H14.5168L14.5167 17.658ZM5.80839 17.658H8.71697V20.5666H5.80846L5.80839 17.658ZM66.758 26.3663H69.6666V29.2749H66.758V26.3663ZM40.6417 26.3663H43.5503V29.2749H40.6418L40.6417 26.3663ZM23.2251 26.3663H26.1337V29.2749H23.2251L23.2251 26.3663ZM14.5167 26.3663H17.4253V29.2749H14.5168L14.5167 26.3663ZM5.80839 26.3663H8.71698V29.2749H5.80846L5.80839 26.3663ZM66.758 35.0804H69.6666V37.989H66.758V35.0804ZM58.0497 35.0804H60.9583V37.989H58.0497V35.0804ZM14.5167 35.0804H17.4253V37.989H14.5168L14.5167 35.0804ZM5.80839 35.0804H8.71698V37.989H5.80846L5.80839 35.0804ZM66.758 43.7888H69.6666V46.6973H66.758V43.7888ZM58.0497 43.7888H60.9583V46.6973H58.0497V43.7888ZM31.9334 43.7888H34.842V46.6973H31.9335L31.9334 43.7888ZM14.5167 43.7888H17.4253V46.6973H14.5168L14.5167 43.7888ZM5.80839 43.7888H8.71698V46.6973H5.80846L5.80839 43.7888ZM66.758 52.4884H69.6666V55.397H66.758V52.4884ZM58.0497 52.4884H60.9583V55.397H58.0497V52.4884ZM49.3501 52.4884H52.2587V55.397H49.3501L49.3501 52.4884ZM31.9334 52.4884H34.842V55.397H31.9335L31.9334 52.4884ZM5.80839 52.4884H8.71697V55.397H5.80846L5.80839 52.4884Z"
                    fill="url(#paint0_linear_56_14949)" />
                  <defs>
                    <linearGradient id="paint0_linear_56_14949" x1="0.00018188" y1="69.9162" x2="69.6661" y2="69.9162"
                      gradientUnits="userSpaceOnUse">
                      <stop offset="1" stop-color="#0080D4" />
                      <stop stop-color="#A83BBA" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span class="font-welcome">Report</span>
            </div>
            <p class="text-white">View live data</p>
          </div>
          <div class="align-self-end mb-4"><button class="btn rounded-0 btn-primary">Download report</button></div>


        </div>
        <div class="row  row-cols-xl-9">
          <div class="">
            <h4 class="mb-2 ml-2">Team</h4>
          </div>
          <div class="col-img">
            <div class="gallery">
              <div class="asc pb-2">TTG Head Office Super User</div>
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
              </router-link>

            </div>
          </div>
          <div class="col-img">
            <div class="gallery">
              <div class="asc pb-2">TTG Head Office Admin</div>
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
              </router-link>

            </div>
          </div>
          <div class="col-img">
            <div class="gallery">
              <div class="asc pb-2">TTG Regional Manager</div>
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
              </router-link>
            </div>
          </div>
        </div>

        <div class="row mt-6  row-cols-xl-9">
          <div class="">
            <h4 class="mb-2 ml-2">Promoters</h4>
          </div>
          <div class="col-img">
            <div class="gallery">
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
              </router-link>
              <div class="checkbox">
                <input type="checkbox" id="select">
                <span>&#x2713;</span>
              </div>
            </div>
            <div class="desc">Mazisi Msebele</div>
          </div>
        </div>
        <div class=" col-img">
          <div class="gallery">
            <router-link to="/profile">
              <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
            </router-link>
            <div class="desc">Dave Doe</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <router-link to="/profile">
              <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
            </router-link>
            <div class="desc">Nkanyiso Ncube</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <router-link to="/profile">
              <img src="../../assets/images/avatars/avatar-4.png" alt="Mountains" width="600" height="400">
            </router-link>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>

        <div class="col-img">
          <div class="gallery">
            <router-link to="/profile">
              <img src="../../assets/images/avatars/avatar-5.png" alt="Mountains" width="600" height="400">
            </router-link>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <router-link to="/profile">
              <img src="../../assets/images/avatars/avatar-6.png" alt="Mountains" width="600" height="400">
            </router-link>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-12 mt-4 mb-6">
        <h2 class="mb-4"> <i class='bx bx-check-circle text-primary'></i> Completed</h2>
      </div>

      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="card radius-10">
            <div class="card-body">
              <div class="">
                <div id="chart3" style="height:250px;"><svg height="250" version="1.1" width="665.328"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="overflow: hidden; position: relative;">
                    <desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.2.0</desc>
                    <defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs>
                    <path fill="none" stroke="#008cff"
                      d="M332.664,201.66666666666669A76.66666666666667,76.66666666666667,0,0,0,408.94122662266636,132.71767299982181"
                      stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;">
                    </path>
                    <path fill="#008cff" stroke="#ffffff"
                      d="M332.664,204.66666666666669A79.66666666666667,79.66666666666667,0,0,0,411.92598766442285,133.01966889981483L442.1052381977387,136.07318299974432A110,110,0,0,1,332.664,235Z"
                      stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    <path fill="none" stroke="#15ca20"
                      d="M408.94122662266636,132.71767299982181A76.66666666666667,76.66666666666667,0,0,0,261.12270210661495,97.4387867918025"
                      stroke-width="2" opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;">
                    </path>
                    <path fill="#15ca20" stroke="#ffffff"
                      d="M411.92598766442285,133.01966889981483A79.66666666666667,79.66666666666667,0,0,0,258.3232600151347,96.36030453582956L225.35205315992243,83.65818018770375A115,115,0,0,1,447.0798399339995,136.5765094997327Z"
                      stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    <path fill="none" stroke="#fd3550"
                      d="M261.12270210661495,97.4387867918025A76.66666666666667,76.66666666666667,0,0,0,332.6399144567186,201.66666288331834"
                      stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;">
                    </path>
                    <path fill="#fd3550" stroke="#ffffff"
                      d="M258.3232600151347,96.36030453582956A79.66666666666667,79.66666666666667,0,0,0,332.638971978938,204.6666627352743L332.6294424813789,234.99999457171762A110,110,0,0,1,230.01778997905626,85.45565061432532Z"
                      stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="332.664"
                      y="115" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="15px" stroke="none"
                      fill="#000000"
                      style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 15px; font-weight: 800;"
                      font-weight="800" transform="matrix(1.7424,0,0,1.7424,-246.9778,-93.5455)"
                      stroke-width="0.5739130434782609">
                      <tspan dy="6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Nokia</tspan>
                    </text><text x="332.664" y="135" text-anchor="middle" font-family="&quot;Arial&quot;"
                      font-size="14px" stroke="none" fill="#000000"
                      style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 14px;"
                      transform="matrix(1.5972,0,0,1.5972,-198.6743,-75.8472)" stroke-width="0.6260869565217391">
                      <tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan>
                    </text>
                  </svg></div>
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">
                Apple <span class="badge bg-danger rounded-pill">20</span>
              </li>
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Samsung
                <span class="badge bg-primary rounded-pill">15</span>
              </li>
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Nokia
                <span class="badge bg-success rounded-pill">30</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-lg-8 d-flex">
          <div class="card radius-10 w-100">
            <div class="card-header">
              <div class="d-flex align-items-center">
                <div>
                  <h6 class="mb-0">Main Tasks To Set Up</h6>
                </div>
                <div class="dropdown ms-auto">

                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive table table-dark table-striped">
                <table class="table align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Project</th>
                      <th>Task</th>
                      <th>Risk</th>
                      <th>Planned End-Date</th>
                      <th>Time Record</th>
                      <th>Project Responsible</th>
                      <th>Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="maz-table-row-height">
                      <td>Project 1</td>
                      <td>5822</td>
                      <td style="background-color: #D1345B; text-align: center">At Risk</td>
                      <td>03-06-2020</td>
                      <td>18:00:00</td>
                      <td>Bransley</td>
                      <td>45%</td>
                    </tr>

                    <tr class="maz-table-row-height">
                      <td>Project 2</td>
                      <td>4620</td>
                      <td style="background-color: #1E90D9; text-align: center">On Track</td>
                      <td>05-06-2023</td>
                      <td>18:00:00</td>
                      <td>John Doe</td>
                      <td>80%</td>
                    </tr>

                    <tr class="maz-table-row-height">
                      <td>Project 3</td>
                      <td>6890</td>
                      <td style="background: #FE9947; text-align: center">Planned</td>
                      <td>06-06-2023</td>
                      <td>18:00:00</td>
                      <td>Dave</td>
                      <td>22%</td>
                    </tr>

                    <tr class="maz-table-row-height">
                      <td>Project 4</td>
                      <td>3765</td>
                      <td style="background-color: #1E90D9; text-align: center">On Track</td>
                      <td>14-07-2024</td>
                      <td>18:00:00</td>
                      <td>Msebele</td>
                      <td>22%</td>
                    </tr>
                    <tr class="maz-table-row-height">
                      <td>Project 5</td>
                      <td>9240</td>
                      <td style="background-color: #A639B6; text-align: center">Delayed</td>
                      <td>18-06-2025</td>
                      <td>18:00:00</td>
                      <td>Dave</td>
                      <td>12%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>




      </div>



      <div class="card">

        <div class="card-body">
          <div class="my-table" style="padding-left: 7rem;padding-right: 7rem;">
            <div class="col-12">
              <h3 class="text-center fs-2 bg-gray">Post campaign analysis</h3>
            </div>
            <table class="table table-bordered mb-0 maz-table">
              <thead>
                <tr>
                  <th scope="col">JOBS</th>
                  <th scope="col">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reported By</td>
                  <td>Mazisi Msebele</td>
                </tr>
                <tr>
                  <td>What worked</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">MC shoutouts, drive interest and sales</li>
                      <li style="list-style:disc;">Price point packages to be reconsidered for some venues - As seen
                        with Milano, it
                        produces good results - All venues that have price points & specials that accommodate the
                        affordability of the crowd always have good sales</li>
                      <li style="list-style:disc;">Good sales reps and venue relationships (Drama, Nostra, Milano,
                        Liv
                        Sandton, Groove</li>
                      <li style="list-style:disc;">Tales</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>What didn't work</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">Club refused to play AV as they were promoting their content</li>
                      <li style="list-style:disc;">Club manager bought 12 bottles to win the 3L bottles and did not
                        consume the purchased
                        12 bottles throughout the night</li>
                      <li style="list-style:disc;">Insisted on full kit to be used for set up (Delayed set up by an
                        hour)</li>
                    </ol>
                  </td>
                </tr>

                <tr>
                  <td>Suggestions</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">Clear comms and expectations between venue and sales reps</li>
                      <li style="list-style:disc;">Review venue selections for next activation round</li>
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
              <span>Load More</span>
              <i class='bx bx-chevron-down fs-2'></i>
            </div>

          </div>
        </div>
      </div>


      <div class="card radius-10 w-100">
        <div class="card-header">
          <div class="d-flex align-items-center justify-content-center">
            <h6 class="mb-0 text-center fs-2">Overall Summary</h6>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-container1">
            <canvas id="chart8" width="1301" height="380"
              style="display: block; box-sizing: border-box; height: 380px; width: 1301px;"></canvas>
          </div>
        </div>
      </div>

      <div class="row mt-6  row-cols-xl-9 ">
        <div class="">
          <h4 class="mb-2 ml-2">Gallery</h4>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-1.png">
              <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
            </a>
            <div class="desc">Mazisi Msebele</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-2.png">
              <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
            </a>
            <div class="desc">Dave Doe</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-3.png">
              <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
            </a>
            <div class="desc">Nkanyiso Ncube</div>
          </div>
        </div>

        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-4.png">
              <img src="../../assets/images/avatars/avatar-4.png" alt="Mountains" width="600" height="400">
            </a>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>

        <div class="col-img">
          <div class="gallery">
            <a href="../../assets/images/avatars/avatar-5.png" data-lightbox="image-1" data-title="My caption">
              <img src="../../assets/images/avatars/avatar-5.png" alt="Mountains" width="600" height="400">
            </a>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-6.png">
              <img src="../../assets/images/avatars/avatar-6.png" alt="Mountains" width="600" height="400">
            </a>
            <div class="desc">Rico Nyathi</div>
          </div>
        </div>

        <div class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
          <span>Load More</span>
          <i class='bx bx-chevron-down fs-2'></i>
        </div>
      </div>


    </div>

    <!--start switcher-->

  </Layout>
</template>
<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';

</script>
<style scoped>
@import 'lightbox2/dist/css/lightbox.css';
</style>
<style scoped>
.main-dashboard-head {
  display: flex;
  align-items: center;

}

.page-icon {
  max-width: 4rem !important;
  fill: linear-gradient(to right, #9A3AB1, #117A);
  margin-right: 1rem
}

.maz-height {
  font-size: 3rem;
  height: 7rem;
}



html.dark-theme .widgets-icons {
  color: #fff;
}

.maz-table-row-height {
  height: 55px;
}

.col-width-30 {
  width: 4.5%;
}

.col-width-10 {
  width: 10%;
}



div.gallery {
  margin: 5px;
  border: 1px solid #12181A;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

.col-img {
  position: relative;
  display: inline-block;
  width: 200px;
}

.gallery {
  position: relative;
}

.gallery img {
  width: 100%;
  height: auto;
}

.desc {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0;
}

.checkbox input[type="checkbox"]:checked+span {
  background-color: white;
  font-weight: 1000;
  color: black;
  background-color: transparent
    /* width: 100%; */
}

div.desc {
  padding: 13px;
  text-align: center;
}

.col-img {
  flex: 0 0 0%;
}

.mt-6 {
  margin-top: 2rem !important;
}

.asc {
  text-align: center;
  background: #12181A;
  width: 180px;
  font-size: 1.2rem;
  font-weight: 600;
}



.maz-table {
  background: #575757;
}

html.dark-theme .table td,
html.dark-theme .table th {
  border-color: #141414;
}
</style>