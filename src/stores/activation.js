import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useActivation = defineStore('activation', () => {

    function submit(formData, config) {
      return axiosInstance.post(`/api/activations`,formData, config);
    }

    const getActivations = () => {
      return axiosInstance.get(`/api/activations`);
    }

    const getActivationImages = (activationId) => {
      return axiosInstance.get(`/api/images/all/${'activations'}/${activationId}`);
    }

    const update = (id,form) => {
      return axiosInstance.put(`/api/activations/${id}`,form);
    }
    const deleteActivation = (id) => {
      return axiosInstance.delete(`/api/activations/${id}`);
    }

    const getActivationById = (id) => {
      return axiosInstance.get(`/api/activations/${id}`);
    }

    //make the id optional parameter

    const getAllActivations = ( userRole, id=null) => { console.log(id);
      switch (userRole) {
        case 'TTG_REGIONAL_MANAGER':
          return axiosInstance.get(`/api/activations/region/${id}`);
        case 'TTG_ACTIVATION_MANAGER':
          return axiosInstance.get(`/api/activations/staff/${id}`);
        case 'TTG_TALENT':
          return axiosInstance.get(`/api/activations/promoter/${id}`);
        case 'SUPPLIER':
            return axiosInstance.get(`/api/activations/thirdParty/${id}`);
        default:
          return axiosInstance.get(`/api/activations/campaign/${id}`);
      }
      
    }
    const getActivationsByCampaignId = (campaignId) => {
      return axiosInstance.get(`/api/activations/campaign/${campaignId}`);
    }
  
    const getActivationByStaffId = (staffId) => {
      return axiosInstance.get(`/api/activations/staff/${staffId}`);
    }

    const uploadImages = (formData, config) => {

      console.log(formData);
      // change this endpoint @Busani
      return axiosInstance.post(`/api/images`,formData, config);
    }


    //GET ALL ACTIVATIONS LOCATIONS
    const getAllActivationsAdmins = () => {

      return axiosInstance.get(`/api/activations/admins`);
    }


    const getAllActivationsRegionalManager = (StaffId) => {

      return axiosInstance.get(`/api/activations/region/staff/${StaffId}`);
    }

    const getAllActivationsManager = (StaffId) => {

      return axiosInstance.get(`/api/activations/manager/staff/${StaffId}`);
    }

    const getAllActivationsPromoter = (promoterId) => {

      return axiosInstance.get(`/api/activations/promoter/${promoterId}`);
    }

    const getAllActivationsSupplier = (supplierId) => {

      return axiosInstance.get(`/api/activations/thirdParty/${supplierId}`);
    }    

    const getAllTasksLocation = (userId, role) => {
      return axiosInstance.get(`/api/tasks/location/${userId}/role/${role}`);
    }

    const getAllActivationByRegionId = (regionId) => {
      return axiosInstance.get(`/api/activations/region/${regionId}`);
    }

    const getAllTrainingMaterial = (activationId) => {
      return axiosInstance.get(`/api/approaches/activation/${activationId}`);
    }

    const recordUserOpenedFile = (approachId, promoterId) => {

      return axiosInstance.post(`/api/approaches/read?approachId=${approachId}&promoterId=${promoterId}`);
    }

    const submitTrainingMaterial = (formData, config) => {

      return axiosInstance.post(`/api/approaches`, formData, config);
    }

    const deleteTrainingMaterial = (materialId) => {
      return axiosInstance.delete(`/api/approaches/${materialId}`);
    }
    
  
    return { submit,getActivations,update,deleteActivation,getActivationById,getActivationsByCampaignId,getActivationByStaffId,
             uploadImages , getAllActivations, getActivationImages, getAllActivationsAdmins, getAllActivationsRegionalManager, 
             getAllActivationsManager, getAllTasksLocation, getAllTrainingMaterial,recordUserOpenedFile, submitTrainingMaterial,
             deleteTrainingMaterial, getAllActivationsPromoter, getAllActivationsSupplier, getAllActivationByRegionId
            }
  })