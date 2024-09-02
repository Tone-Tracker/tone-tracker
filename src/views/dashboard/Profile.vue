/**
Author: Mazisi Msebele
Date: 04/06/2024
**/

<template>
    <Layout>
        <!--start page wrapper -->
        <div class="page-wrapper">
            <div class="page-content">

                <!-- <BreadCrumb title="Profile" icon="bx bx-user-circle" /> -->
                <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div class="ps-3">
                        <div class="main-dashboard-head">
                            <span class="font-welcome">Profile</span>
                        </div>
                        <p class="text-white">Promoter</p>
					</div>
					<div class="ms-auto">
						<div class="btn-group">
							
						</div>
					</div>
				</div>
                
              


                <div class="row gap-5">
                    <div class="col-lg-3">
                        <div class="card-c">
                            <div class="d-flex flex-column card-header-c">
                                <div class="image-container">
                                    <div class="card flex justify-center">
                                        <Image alt="Image" preview>
                                            <template #previewicon>
                                              <i class='bx bx-search-alt-2' ></i>
                                            </template>
                                            <template #image>
                                                <img 
                                                src="https://tonetracker-bucket.s3.af-south-1.amazonaws.com/images/TTG_SUPER_ADMIN/1/6c16f95e5837b7a15cc22a32eb72fad8.jpg" 
                                                alt="image" width="350" />
                                            </template>
                                            <template #preview="slotProps">
                                                <img 
                                                src="https://tonetracker-bucket.s3.af-south-1.amazonaws.com/images/TTG_SUPER_ADMIN/1/6c16f95e5837b7a15cc22a32eb72fad8.jpg" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                            </template>
                                        </Image>
                                        </div>
                                    <!-- <img src="g" alt="Admin" class="zoom-image" style="width: 300px; height: 350px;"> -->
                                    <div v-if="isMyProfile()" 
                                        class="edit-icon" data-bs-toggle="modal" data-bs-target="#addProfilePicModal">
                                        <i class='bx bx-edit-alt fs-2'></i>
                                    </div>
                                </div>

                                <div class="mt-3 mb-4">
                                    <h4 class="text- ">{{ getFullName() }} </h4>
                                    <h4 class="text-center"><Rating :modelValue="4" :readonly="true" class="mt-2" width="20px"/> </h4>
                                </div>

                                <div class="profile-imgs mb-4">
    <div class="image-gallery">
      <div v-if="images?.length > 0" class="image-grid">
        <div v-for="image in images" :key="image.id" class="image-item">
          <div class="card flex justify-center">
            <Image alt="Image" preview>
              <template #previewicon>
                <i class='bx bx-search-alt-2'></i>
              </template>
              <template #image>
                <img :src="envPath + image.path" alt="image" />
              </template>
              <template #preview="slotProps">
                <img :src="envPath + image.path" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
              </template>
            </Image>
          </div>
        </div>
      </div>
    </div>
  </div>
                                <div class="mb-4">
                                    <button v-if="isMyProfile()"
                                        class="btn rounded-0 btn-primary ps-5 pe-5 d-flex justify-content-center align-items-center"
                                        data-bs-toggle="modal" data-bs-target="#addModal">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" style="fill: #ffffff;transform: msFilter;">
                                                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                            </svg>
                                        </span><span>Add</span>
                                    </button>

                                </div>
                                <!-- Add Modal -->
                                <div v-if="showModal" class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="addModalLabel">Drag and drop your images</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)"  :multiple="true" accept="image/*" @select="onSelectedFiles">
                                                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                                        <div class="d-flex flex-wrap justify-content-between align-items-center flex-grow-1 gap-4">
                                                            <div class="d-flex gap-2">
                                                                <Button @click="chooseCallback()" icon="bx bx-images" class="btn btn-outline-secondary text-white rounded"></Button>
                                                                <Button @click="clearCallback()" icon="bx bx-x" class="btn btn-outline-danger rounded" :disabled="!files || files.length === 0"></Button>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                                        <div class="d-flex flex-column gap-4 pt-4">
                                                            <div v-if="files.length > 0">
                                                                <div class="d-flex flex-wrap gap-4">
                                                                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-4 rounded border d-flex flex-column border-secondary align-items-center gap-2">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                                        </div>
                                                                        <span class="font-weight-bold text-truncate w-75">{{ file.name }}</span>
                                                                        <div>{{ formatSize(file.size) }}</div>
                                                                        <Button icon="bx bx-x" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" class="btn btn-outline-danger rounded" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                        
                                                            <div v-if="uploadedFiles.length > 0">
                                                                <div class="d-flex flex-wrap gap-4">
                                                                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-4 rounded border d-flex flex-column border-secondary align-items-center gap-2">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                                        </div>
                                                                        <span class="font-weight-bold text-truncate w-75">{{ file.name }}</span>
                                                                        <div>{{ formatSize(file.size) }}</div>
                                                                        <Badge value="Completed" class="mt-4 badge bg-success" />
                                                                        <Button icon="bx bx-x" @click="removeUploadedFileCallback(index)" class="btn btn-outline-danger rounded" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #empty>
                                                        <div class="d-flex align-items-center justify-content-center flex-column">
                                                            <i class="bx bx-cloud-upload border border-2 rounded-circle p-4 fs-6 text-muted" />
                                                            <p class="mt-3 mb-0">Drag and drop files to here to upload.</p>
                                                        </div>
                                                    </template>
                                                </FileUpload>
                                            </div>

                                            <div class="modal-footer">
                                                <div class="col-12 mt-4">
                                                    <div class="d-grid mt-3">
                                                        <button @click="onSubmit" class="btn maz-gradient-btn" type="button" 
                                                           :disabled="showLoading"> 
                                                            <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Submit
                                                        </button>
                                                      </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Add Profile picture modal -->
                                <div class="modal fade" id="addProfilePicModal" tabindex="-1" aria-labelledby="addModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="addModalLabel">Add Profile Picture</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                                
                                        </div>
                                        <div class="modal-body">
                                            <input accept="image/*" @change="onProfilePicSelect($event)" type="file" name="prof-pic-upload" id="prof-pic-upload" hidden />
                                           <label  for="prof-pic-upload" class="w-100 btn btn-lg btn-success px-5"><i class='bx bx-image-add fs-3' ></i>Upload</label>
                                          
                                          <VuePictureCropper
                                          :boxStyle="{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#f8f8f8',
                                            margin: 'auto',
                                          }"
                                          :img="pic"
                                          :options="{
                                            viewMode: 1,
                                            dragMode: 'move',
                                            aspectRatio: 1,
                                            cropBoxResizable: false,
                                          }"
                                          :presetMode="{
                                            mode: 'fixedSize',
                                            width: 300,
                                            height: 400,
                                          }"
                                          @ready="ready"
                                          class="mt-3"
                                        />
                                          
                                        <div class="tools" v-if="showTools">
                                            <button class="btn" data-bs-dismiss="modal">
                                              Cancel
                                            </button>
                                            <!-- <button class="btn" @click="clear">
                                              Clear
                                            </button> -->
                                            <button class="btn" @click="reset">
                                              Reset
                                            </button>
                                          </div>
                                        </div>

                                        <div class="modal-footer">
                                            <div class="col-12 mt-4">
                                                <div class="d-grid">
                                                    <button @click="getResult" class="btn maz-gradient-btn"
                                                        type="button">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                           

                            <!-- comment -->
                            <Accordion value="0">
                                <AccordionPanel value="1">
                                    <AccordionHeader>
                                        <h5>Comments</h5>
                                       
                                    </AccordionHeader>
                                    <AccordionContent>

                                        <!-- start comments -->
                                        <div v-for="rating in promoterData.ratings" :key="rating.id" class="comment">
                                                <div class="user">
                                                    <img :src="envPath + userInfo?.path" alt="User avatar">
                                                    <div>
                                                        <div class="user-name">{{ rating.firstName + " "+ rating.lastName }}</div>
                                                        <Rating v-model="rating.rating" />
                                                    </div>
                                                </div>
                                                <div class="comment-text">
                                                    {{ rating.comment }}
                                                </div>
                                               
                                                    <i @click="deleteComment(rating.id)" class='mt-2 cursor-pointer text-danger fs-3 bx bx-trash'></i>
                                                
                                            </div>
                                         <!-- end comments -->
                                        <div class="comment-section mt-3">
                                            
                                            <div class="mb-3 ">
                                                <div class="mt-3 mb-3 flex justify-center">
                                                <Rating v-model="commentForm.rating" />
                                                <p v-if="!commentForm.rating" class="text-danger" style="font-size: .7rem">Please give rate</p>
                                            </div>
                                                <FloatLabel>
                                                    <Textarea class="form-control" 
                                                    v-model="commentForm.comment" autoResize rows="5" cols="30" />
                                                    <label>Write Comment</label>
                                                </FloatLabel>
                                                <p v-if="!commentForm.comment" class="text-danger" style="font-size: .7rem">Please write comment</p>
                                            </div>
                                            
                                            <button type="button" @click="submitComment"
                                        class="btn rounded-0 btn-primary "
                                        ><span>Post Comment</span>
                                    </button>
                                            
                                          
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                        </div>

                        <div class="prmoters-jobs">
                            <!-- <h5 class="text-white">Others promoters jobs</h5> -->
                            <div class="row mt-6  row-cols-xl-9 ">
                                <div class="">
                                    <h4 class="mb-2 mt-5 ml-2">Others promoters jobs</h4>
                                </div>

                                <div  class="d-flex"> 
                                    <div v-for="promoter in otherPromotersList" :key="promoter.id">
                                        <div v-if="promoter.id !== promoterId" class="col-img">
                                            <div class="gallery">
                                                <div class="card flex justify-center">
                                                    <Image alt="Image" preview>
                                                        <template #previewicon>
                                                            <i class='bx bx-search-alt-2'></i>
                                                        </template>
                                                        <template #image>
                                                            <img 
                                                                :src="promoter.profilePicture || '../../assets/images/avatars/avatar-1.png'"
                                                                :alt="promoter.userDetails.firstName" 
                                                                width="250" 
                                                            />
                                                        </template>
                                                        <template #preview="slotProps">
                                                            <img 
                                                                :src="promoter.profilePicture || '../../assets/images/avatars/avatar-1.png'"
                                                                :alt="promoter.userDetails.firstName" 
                                                                :style="slotProps.style" 
                                                                @click="slotProps.onClick" 
                                                            />
                                                        </template>
                                                    </Image>
                                                </div>
                                                <div class="desc">{{ promoter.userDetails.firstName + " " + promoter.userDetails.lastName }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <!-- <div
                                    class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
                                    <span>Load More</span>
                                    <i class='bx bx-chevron-down fs-2'></i>
                                </div> -->
                            </div>
                        </div>


                       
                    </div>
                    <div class="col-lg-5">
                        <div class="card">
                            <div class="card-body p-4">
									<div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">First Name</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="first-name" v-model="profileForm.firstName">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-user"></i></span>
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="last-name" class="col-sm-3 col-form-label">Last Name</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="last-name" v-model="profileForm.lastName">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-user"></i></span>
											</div>
										</div>
									</div>
									<div class="row mb-3">
										<label for="phone" class="col-sm-3 col-form-label">Phone Number</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="tel" class="form-control" id="phone" v-model="profileForm.phone">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-phone"></i></span>
											</div>
										</div>
									</div>
									<div class="row mb-3">
										<label for="email" class="col-sm-3 col-form-label">Email Address</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="email" class="form-control" id="email" v-model="profileForm.email">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-envelope"></i></span>
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="description" class="col-sm-3 col-form-label">Bio</label>
										<div class="col-sm-9">
											<textarea class="form-control" id="description" rows="3" v-model="profileForm.description" 
                                            placeholder="Your Bio"></textarea>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">Height</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control form-control2" id="first-name" v-model="profileForm.height">
												
											</div>
										</div>
									</div>
                                    <!-- <div class="row mb-3">
                                        
										<label for="first-name" class="col-sm-3 col-form-label">DOB</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control form-control2" id="first-name" v-model="profileForm.dob">
												
											</div>
										</div>
									</div> -->
                                    <div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">Gender</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<select v-model="profileForm.gender" class="form-control form-control2" id="dress_size">
                                                    <option :value="''" disabled :selected="true" >Choose gender...</option>
                                                    <option value="MALE">MALE</option>
                                                    <option value="FEMALE">FEMALE</option>
                                                  </select>
												
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">Dress Size</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<select v-model="profileForm.dressSize" class="form-control form-control2" id="dress_size">
                                                    <option :value="''" disabled :selected="true" >Choose Dress Size...</option>
                                                    <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
                                                  </select>
												
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">Top size</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
                                                <select v-model="profileForm.topSize" class="form-control form-control2" id="top-size">
                                                    <option :value="''" disabled :selected="true">Choose Top Size...</option>
                                                    <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
                                                  </select>
												
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">Pants Size</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control form-control2" id="first-name" v-model="profileForm.pantsSize">
												
											</div>
										</div>
									</div>
									<div class="row" v-if="isMyProfile()">
										<label class="col-sm-3 col-form-label"></label>
										<div class="col-sm-9">
											<div class="d-md-flex justify-content-center align-items-center d-grid align-items-center gap-3">
												<button @click="updateProfile" type="button" class="btn maz-gradient-btn w-100 px-4">
                                                    <div v-if="showProfileLoading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    {{ showProfileLoading ?  '' : 'Update' }}
                                                </button>
											</div>
										</div>
									</div>
								</div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card mb-3">
        <div class="card-body p-4">
            <h4 class="mb-2 text-center mt-2">Experience</h4>
            <div class="row mb-3">
                <div v-for="experience in promoterData?.experiences" :key="experience?.id" class="row mb-3">
                    <div>
                        <h6 class="mb-0">{{ experience?.name }}</h6>
                        <p>{{ experience?.duration }}</p>
                        <p>{{ experience?.description }}</p>
                    </div>
                </div>
            </div>
            <div class="row" v-if="isMyProfile()">
                <div class="col-12 text-end">
                    <button @click="showExperienceModal=true" type="button" class="btn maz-gradient-btn">Add Experience</button>
                </div>
                                </div>
                            </div>
                        </div>

                        <div class="card maz-gradient-border-top mt-4">
                            <div class="card-body p-4">
                                <h4 class="mb-2 text-center mt-2">Change Password</h4>
									<div class="row mb-3">
										<label for="password" class="col-sm-3 col-form-label">New Password</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="password" placeholder="New Password" v-model="passwordForm.password">
												<span class="position-absolute top-50 translate-middle-y"><i class='bx bx-lock-alt'></i></span>
											</div>
                                            <div
                                            class="input-errors"
                                            v-for="error of vv$.password.$errors"
                                            :key="error.$uid">
                                            <div class="text-danger">Password is required</div>
                                            </div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="password-confirm" class="col-sm-3 col-form-label">Confirm Password</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="password-confirm" placeholder="Confirm Password" v-model="passwordForm.confirmPassword">
												<span class="position-absolute top-50 translate-middle-y"><i class='bx bx-lock-alt'></i></span>
											</div>
                                            <div
                                            class="input-errors"
                                            v-for="error of vv$.confirmPassword.$errors"
                                            :key="error.$uid">
                                            <div class="text-danger">Please confirm your password</div>
                                            </div>
										</div>
									</div>
									<div class="row" v-if="isMyProfile()">
										<label class="col-sm-3 col-form-label"></label>
										<div class="col-sm-9">
											<div class="d-md-flex justify-content-center align-items-center d-grid align-items-center gap-3">
												<button @click="updatePassword" type="button" class="btn maz-gradient-btn w-100 px-4">
                                                    <div v-if="showPasswordLoading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    {{ showPasswordLoading ?  '' : 'Update Password' }}
                                                </button>
											</div>
										</div>
									</div>
								</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <Dialog v-model:visible="showExperienceModal" header="Add Experience" :style="{ width: '30rem' }" position="top" :modal="true" :draggable="false">
            <form @submit.prevent="addExperience">
            <div class="row g-3">
                  <div class="col-md-12">
                  <label for="name" class="form-label">Name</label>
                 <div class=" flex justify-center">
                    <InputText type="text" v-model="experienceForm.name" class="w-100" />
                 </div>
                  <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="text-danger">Name is required</div>
                    </div>
                  </div>
                  <div class="col-md-12">
                  <label for="name" class="form-label">Duration</label>
                 <div class=" flex justify-center">
                    <InputText type="text" v-model="experienceForm.duration" class="w-100" placeholder="E.g 2 years"/>
                 </div>
                  <div class="input-errors" v-for="error of v$.duration.$errors" :key="error.$uid">
                    <div class="text-danger">Duration is required</div>
                    </div>
                  </div>
                   <div class="col-md-12">
                  <label for="description" class="form-label">Description</label>
                 <div class=" flex justify-center">
                    <Textarea v-model="experienceForm.description" autoResize rows="5" cols="50" />
                 </div>
                  <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                    <div class="text-danger">Description is required</div>
                    </div>
                  </div>
          
                </div> 
            <div class="flex justify-end gap-2" v-if="isMyProfile()">
                <button type="submit" class="btn btn maz-gradient-btn mt-2 w-100">Save</button>
            </div>
            </form>
        </Dialog>
    </Layout>
</template>
<script setup>
import FloatLabel from 'primevue/floatlabel';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import Layout from '../shared/Layout.vue';
import { useComments } from '@/stores/comments';
import Rating from 'primevue/rating';
import { onMounted, reactive, ref, watch } from 'vue';
import { usePromoter} from '@/stores/promoter';
import useToaster from '@/composables/useToaster';
import { useRoute } from 'vue-router';
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import { useAuth } from '@/stores/auth';
import Image from 'primevue/image';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useUserStore } from '@/stores/userStore';

const envPath = import.meta.env.VITE_AWS_S3_BUCKET;
const sizes = ref(["X_SMALL", "SMALL", "MEDIUM", "LARGE", "X_LARGE", "XX_LARGE"]);

onMounted(() => {
    getUser();
    getPromoterDetails();
    getImages();
    if (taskId.value != null) {
        getListOtherPromoters();   
    }
})
const showExperienceModal = ref(false);
const promoterStore = usePromoter();
const authStore = useAuth();
const commentStore = useComments();
const route = useRoute();
const toaster = useToaster();
const userStore = useUserStore();
const files = ref([]);
const promoterId = ref(route.params.id);
const userIdParam = ref(route.params.userId);
const taskId = ref(route.query.taskId);
const totalSizePercent = ref(0);


const $primevue = usePrimeVue();
const totalSize = ref(0);
const showLoading = ref(false);
const showProfileLoading = ref(false);
const showPasswordLoading = ref(false);

const user = JSON.parse(authStore.user)
const promoterData = ref({});
const otherPromotersList = ref([])
const profilePicName = ref('');
const profilePicPreview = ref(null);
const profilePic = ref(null);
const showTools = ref(false);
const showBioTextarea = ref(false);

const passwordForm = ref({
    password: '',
    confirmPassword: ''
});

const paswordRules = {
      password: { required },
      confirmPassword: { required },
    };
    const vv$ = useVuelidate(paswordRules, passwordForm);


const updatePassword = async () => {
    const isFormCorrect = await vv$.value.$validate();
      if (!isFormCorrect) {
        showPasswordLoading.value = false;
        return;
      }
    showPasswordLoading.value = true;
    userStore.updateProfile(user.id,passwordForm.value).then(function (response) {
        showPasswordLoading.value = false;
        toaster.success('Password updated successfully')
    }).catch(function (error) {
        showPasswordLoading.value = false;
        toaster.error('Something went wrong')
        console.log(error)
    }).finally(() => {
        showPasswordLoading.value = false
    })
}

const experienceForm = reactive({
    promoter: promoterId.value,
    name: null,
	duration: null,
	description: null,
});

const rules = { 
	name: { required },
	duration: { required },
	description: { required },
};
const v$ = useVuelidate(rules, experienceForm);

const addExperience = async () => {
    const isFormValid = await v$.value.$validate();
	if (!isFormValid) {return;}
    promoterStore.addExperience(experienceForm).then(function (response) {
        experienceForm.name = '';
        experienceForm.duration = '';
        experienceForm.description = '';
        v$.value.$errors = [];
        v$.value.$reset();
        getPromoterDetails();
        toaster.success('Experience added successfully')
        //reset form and errors

        showExperienceModal.value = false
    }).catch(function (error) {
        toaster.error('Something went wrong')
        console.log(error)
    })
}

const myBio = ref(promoterData.value.bio ? promoterData.value.bio : '');
console.log('myBio',promoterData.value)

const editBio = () => {
    showBioTextarea.value = !showBioTextarea.value
}

const updateProfile = () => {
    showProfileLoading.value = true;
    userStore.updateProfile(user.id,profileForm.value).then(function (response) {
        getUser();
        getPromoterDetails();
        showProfileLoading.value = false;
        toaster.success('Profile updated successfully')
    }).catch(function (error) {
        showProfileLoading.value = false;
        toaster.error('Something went wrong')
        console.log(error)
    }).finally(() => {
        showProfileLoading.value = false
    })
}

const closeBioTextarea = () => {
    showBioTextarea.value = false
}



const commentForm = reactive({
    rating: null,
    comment: null,
    user: user.id,
    promoter: promoterId.value ? parseInt(promoterId.value, 10) : null
});

const pic = ref('');
const uploadInput = ref(null)
    const result = reactive({
      dataURL: '',
      blobURL: '',
    })

    const submitComment = () => {
        
        if( !commentForm.rating || !commentForm.user || !commentForm.promoter) return
        
        commentStore.submitComment(commentForm).then(function (response) {
            
        const newComment = {
                ...commentForm,
                firstName: user.firstName,
                lastName: user.lastName
        };
        
        // Push the new comment object to the ratings array
        promoterData.value.ratings.push(newComment);
          
            toaster.success("Comment submitted successfully");
        }).catch(function (error) {
            toaster.error("Error submitting comment");
        console.log(error);
        })
    }

  

    const deleteComment = (id) => {
        if(!confirm('Are you sure you want to delete this comment?')) return
        commentStore.delete(id).then(function (response) {
            toaster.success("Comment deleted successfully");
        }).catch(function (error) {
            toaster.error("Error deleting comment");
        console.log(error);
        })
    }
const onProfilePicSelect = (event) => {

      // Reset last selection and results
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const { files } = event.target
      if (!files || !files.length) return

      // Convert to dataURL and pass to the cropper component
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        showTools.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }

    //const file = event.target.files[0];
    
    if (file) {
        profilePicName.value = file.name;
        profilePicPreview.value = URL.createObjectURL(file);
    }
    profilePic.value = file;
};

async function getResult() {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: `${userInfo.value.firstName}_${userInfo.value.lastName}`
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      //isShowModal.value = false
      const formData = new FormData();
        formData.append('profilePicture',  file);
        // formData.append('entity', "promoters");
        // formData.append('entityId', promoterId.value);
        // formData.append('uploaderId', user.activeUserId);
        const config = {
        useMultipartFormData: true // Add this flag to the request config
        };
        console.log(formData)
        // return

        promoterStore.uploadSingleImage(user.id,formData, config).then(function (response) {
            console.log(response);
        })

    }

    /**
     * Clear the crop box
     */
    function clear() {
      if (!cropper) return
      cropper.clear()
    }

    /**
     * Reset the default cropping area
     */
    function reset() {
      if (!cropper) return
      cropper.reset()
    }

    /**
     * The ready event passed to Cropper.js
     */
    function ready() {
      console.log('Cropper is ready.')
    }

const userInfo = ref(null);
const profileForm = ref({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    topSize: '',
    pantsSize: '',
    dob: '',
    dressSize: '',
    height: '',
    gender: '',
    bio: '',
    promoter: promoterId.value

});
const getUser = () => {
    userStore.getUser(userIdParam.value).then(function (response) {
        console.log('userInfo',response);
        userInfo.value = response.data;
        myBio.value = response.data.bio;
        Object.assign(profileForm.value, {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            email: response.data.email,
            role: response.data.role,
        })
  }).catch(function (error) {
    toaster.error("Error fetching profile");
    console.log(error);
  });
}

const getPromoterDetails = () => {
    promoterStore.getTalentByTalentId(promoterId.value).then(function (response) {
        console.log('Fuck',response.data);
        promoterData.value = response.data;
        Object.assign(profileForm.value, {
            topSize: response.data.topSize,
            pantsSize: response.data.pantsSize,
            dob: response.data.dob,
            dressSize: response.data.dressSize,
            height: response.data.height,
            gender: response.data.gender
        })
        myBio.value = response.data.bio;
  }).catch(function (error) {
    toaster.error("Error fetching profile");
    console.log(error);
  });
}


//get other promoters on the job
const getListOtherPromoters = () => {
    promoterStore.getOtherPromotersByTaskId(taskId.value).then(function (response) {
        otherPromotersList.value = response.data.content;
        console.log("test", response);
  }).catch(function (error) {
    toaster.error("Error in fetching other promoters");
    
  });
}


const isMyProfile = () => {
    // console.log(promoterId.value, user.activeUserId)
    return promoterId.value == user.activeUserId;
}
const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};


const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};


const getFullName = () => {
    if(!userInfo.value) {
        return '';
    }
    return `${userInfo.value.firstName} ${userInfo.value.lastName}`
}

let showModal = ref(true);
const onSubmit = () => {
    if(!files.value.length){
      toaster.error("Please select at least one image");
      return
    }
    showLoading.value = true;
    const formData = new FormData();

     let imageFiles = [];

    for (let i = 0; i < files.value.length; i++) {
        // imageFiles.push(files.value[i]);
	  formData.append('imageFiles', files.value[i]);
  }
        formData.append('entity', "promoters");
        formData.append('entityId', user.id);
        formData.append('uploaderId', user.activeUserId);
    const config = {
    useMultipartFormData: true // Add this flag to the request config
};
    promoterStore.uploadImages(formData, config).then(function (response) {
        showModal = false;
        document.querySelector('.modal-backdrop').remove();
        showLoading.value = false;
        files.value = [];
        getImages();
        toaster.success("Image uploaded successfully");
    }).catch(function (error) {
        toaster.error("Error in uploading image");
        console.log(error);
    }).finally(() => {
        showLoading.value = false;
    })

}
const images = ref([]);
const getImages = async () => {
    promoterStore.getImages(user.id, 'promoters', user.activeUserId).then(response => {
        console.log('images',response.data)
	images.value = response.data;
	console.log('images',images.value)
  }).catch(error => {
	toaster.error("Error fetching task");
	console.log(error);
  }).finally(() => {
	//
  });
};





</script>
<style>
/* //Acordion// */
html.dark-theme .accordion-item {
    /* color: #e4e5e6; */
    background-color: #0F0F0F;
    border: none;
}


div.gallery {
    margin: 5px;
    border: 1px solid #12181A;
    float: left;
    width: 160px;
}

div.gallery:hover {
    border: 1px solid #777;
}

div.gallery img {
    width: 95%;
    height: auto;
}

div.desc {
    padding: 13px;
    text-align: center;
}

.col-img {
    flex: 0 0 0%;
}

.zoom-image {
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    transition: transform 0.3s ease-in-out;
    /* Smooth transition */
}

.image-container:hover .zoom-image {
    transform: scale(1.1);
    /* Zoom in (1.2 = 120%) */
}

.dark-theme .card {
    background-color: transparent !important;
    padding: 0px !important;
}

/* Add some basic styling for the modal */
.modal-content {
    background-color: #1a1a1a;
    color: #ffffff;
}

.modal-header {
    border-bottom: 1px solid #2a2a2a;
}

.modal-footer {
    border-top: 1px solid #2a2a2a;
}

.btn-close {
    color: #ffffff;
}

/* //////////drag and drop///////////////// */
.drag-drop-area {
    border: 2px dashed #5A5959;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.drag-drop-area:hover,
.drag-drop-area.drag-over {
    background-color: #2a2a2a;
}

.drag-drop-text {
    color: #5A5959;
}

#fileList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.file-item {
    background-color: #2a2a2a;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.file-item .remove-file {
    cursor: pointer;
    color: #ff6b6b;
}



.comment-section {
    max-width: 700px;
    margin: 2rem auto;
    background-color: #2c2e33;
    padding: 1.5rem;
    border-radius: 10px;
}
.form-control {
    background-color: #1d1f24;
    color: #ced4da;
    border: 1px solid #404348;
}
.form-control:focus {
    background-color: #1d1f24;
    color: #ced4da;
    border-color: #4a9bfc;
    box-shadow: none;
}
.btn-primary {
    background-color: #4a9bfc;
    border-color: #4a9bfc;
}
.comment {
    margin-top: 1.5rem;
}
.comment .user {
    display: flex;
    align-items: center;
}
.comment .user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.75rem;
}
.comment .user-name {
    font-weight: 500;
    color: #fff;
}
.comment .comment-date {
    color: #a9acb0;
    font-size: 0.9rem;
}
.comment .comment-text {
    margin-top: 0.5rem;
    color: #ced4da;
}






.image-container {
    width: 370px;
    position: relative;
    display: inline-block;
}

.edit-icon {
    position: absolute;
    top: -5px;
    right: 20px;
    border-radius: 50%;      
    padding: 5px;  
    cursor: pointer;
}

.edit-icon i {
    font-size: 20px; 
    color: #fff;
}
.form-control2 {
    padding-left: 1rem !important;
}

/* //////profile image///// */
.image-gallery {
  width: 100%;
  /* padding: 20px; */
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
}

.image-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.05);
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
