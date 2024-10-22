import ViewCampaign from '@/views/campaigns/ViewCampaign.vue';
import Campaign from '../views/campaigns/Campaign.vue';
export default [
    {
        path: '/campaigns',
        name: 'campaigns',
        component: Campaign
      },
      {
        path: '/view-campaign',
        name: 'view-campaign',
        component: ViewCampaign
      },
      
  ]