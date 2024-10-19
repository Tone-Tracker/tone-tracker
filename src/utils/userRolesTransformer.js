export default function userRolesTransformer(rolesArray) {
    if(rolesArray) {
        return rolesArray.map(item => {
          
            let label = item
              .toLowerCase()
              .split('_')
              .slice(1)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '); 
              console.log(label)
            return {
              label: label || item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(), // For non "TTG" items like CLIENT or SUPPLIER
              value: item
            };
          });
    }
    return []
}