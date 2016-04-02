
package com.walmart.pingpos.db.users.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapputils.base.cache.EmailVerificationCode;
import com.webapputils.base.utils.DateUtils;
import com.webapputils.base.utils.StringUtils;
import com.webapputils.base.utils.ValidatorUtils;
import com.walmart.pingpos.configuration.ConfigUtils;
import com.walmart.pingpos.configuration.Property;
import com.walmart.pingpos.entity.Role;
import com.walmart.pingpos.entity.User;
import com.walmart.pingpos.entity.UserRole;
import com.walmart.pingpos.utils.EncryptionUtils;
import com.walmart.pingpos.db.users.IUsersDao;
import com.walmart.pingpos.db.users.IUserRoleService;
import com.walmart.pingpos.db.users.IUserService;

@Transactional
@Service("userService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUsersDao           usersDao;

    @Autowired
    private IUserRoleService    userRoleService;

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public boolean isUserExists(String email) {
        return usersDao.isUserExists(email);
    }

    @Override
    public User addUser(User user) {
        user.setLastUpdated(DateUtils.getCurrentTime());
        user.setCreated(DateUtils.getCurrentTime());
        return usersDao.updateUser(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return usersDao.getUserByEmail(email);
    }

    @Override
    public User updateUser(User user) {
        user.setLastUpdated(DateUtils.getCurrentTime());
        return usersDao.updateUser(user);
    }

    @Override
    public UserRole createUserRole(UserRole userRole) {
        return usersDao.persistUserRole(userRole);
    }

    @Override
    public void persistUser(User user) {
        user.setLastUpdated(DateUtils.getCurrentTime());
        user.setCreated(DateUtils.getCurrentTime());
        usersDao.persistUser(user);
    }

    @Override
    public boolean verifyPassword(User user, String password) {
        if (user != null) {
            String userPassword = user.getPassword();
            String encryptedInputPwd = EncryptionUtils.getMD5EncodedPassword(password);
            if (StringUtils.isNotEmpty(userPassword) && StringUtils.isNotEmpty(encryptedInputPwd)) {
                return encryptedInputPwd.equalsIgnoreCase(userPassword);
            }
        } else {
            LOG.warn("User is found to be null");
            return false;
        }
        return false;
    }

    @Override
    public UserRole updateUserRole(UserRole ur) {
        if (ur != null) {
            return usersDao.updateUserRole(ur);
        }
        return null;
    }

    @Override
    public List<UserRole> getAllUserRoleMappings(User u) {
        return usersDao.getAllUserRoles(u);
    }

    @Override
    public User getUserByEmailForEdit(String email) {
        return usersDao.getUserByEmailForEdit(email);
    }
}
