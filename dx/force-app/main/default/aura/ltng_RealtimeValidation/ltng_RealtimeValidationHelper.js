({
	/**
	 * Whether level1 is unlocked
	 * @return (boolean) - true if unlocked or false if otherwise
	 **/
    isLevel1Unlocked : function(component, helper) {
        return (
        	helper.doesComponentHaveValue(component, helper, 'comboBox') &&
            helper.doesComponentHaveValue(component, helper, 'level1')
        );
	},
    
    /**
     * Locks or Unlocks a specific level
     * @param levelName (String) - name of the level. ex: level1
     * @param isLocked (boolean) - true for locked / false for not
     **/
    setLevelDisabled : function(component, helper, levelName, isLocked){
        component.find(levelName).set("v.disabled", isLocked);
        
        //-- if locking - clear out the value
        if( isLocked ){
            component.find(levelName).set('v.value', null);
        }
    },
    
    /**
     * Unlocks a level, or sequentially locks subsequent levels.
     * @param component
     * @param helper
     * @param levelNum (integer)
     * @param isLocked (boolean)
     **/
    lockByLevel : function(component, helper, levelNum, isLocked){
        helper.setLevelDisabled(component, helper, "level" + levelNum, isLocked);
        
        //-- if locking a lower level, lock the upper levels too
        if( isLocked ){
            if( levelNum < 5 ){
                helper.lockByLevel(component, helper, levelNum+1, true);
            }
        }
    },
    
	/**
	 * Whether a component has a value
	 * @param component
	 * @param helper
	 * @param levelName (String) - name of the level. ex: level2
	 * @return (boolean) - true if unlocked or false if otherwise
	 **/
    doesComponentHaveValue : function(component, helper, levelName) {
        var levelValue = component.find(levelName).get('v.value');
		return(
            !$A.util.isEmpty(levelValue)
        );
	}
})